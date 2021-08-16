const moment = require('moment');
var { Op } = require('sequelize');
const { UsuarioRol, Rol, Estado, Usuario } = require('../../../store/db');
const { registrarBitacora } = require('../../../utils/bitacora_cambios');
const { validarpermiso } = require('../../../auth');
const MenuId=18;
const Modelo = UsuarioRol;
const tabla = 'usuario_rol';
let response = {};

const insert = async (req) => {
    let autorizado=await validarpermiso(req,MenuId,1);
    if(autorizado!==true){
        return autorizado;
    }
    
    const { rolId,usuarioId } = req.body;
    const existe = await Modelo.findOne({ where: { rolId,usuarioId,estadoId: { [Op.ne]: 3} }, attributes: ['usuario_rolId'] });

    if (existe) {
        response.code = -1;
        response.data = "El usuario ya tiene asignado dicho rol";
        return response;
    }

    let { usuarioId:usuarioIdReq } = req.user;
    req.body.usuario_crea = usuarioIdReq;
    const result = await Modelo.create(req.body);
    response.code = 1;
    response.data = result;
    return response;
}

const consultar = async (query) => {
    if (query) {
        return await Modelo.findAll({
            include: [{
                model: Rol,
                as: "Rol",
                required: true,
                attributes: {
                    exclude: ["fecha_crea", "usuario_ult_mod","fecha_ult_mod"],
                  }
            },
            {
                model: Usuario,
                as: "Usuario",
                required: true,
                attributes: {
                    exclude: ["password", "forzar_cambio_password","fecha_cambio_password","dias_cambio_password","intentos_fallidos"],
                  }
            },
            {
                model: Estado,
                as: "Estado",
                required: true,
                attributes: ['descripcion']
            }],
            where: [query],
            order: [
                ['usuario_rolId', 'ASC']
            ]
        });
    } else {
        return await Modelo.findAll({
            include: [{
                model: Rol,
                as: "Rol",
                required: true,
                attributes: {
                    exclude: ["fecha_crea", "usuario_ult_mod","fecha_ult_mod"],
                  }
            },
            {
                model: Usuario,
                as: "Usuario",
                required: true,
                attributes: {
                    exclude: ["password", "forzar_cambio_password","fecha_cambio_password","dias_cambio_password","intentos_fallidos"],
                  }
            },
            {
                model: Estado,
                as: "Estado",
                required: true,
                attributes: ['descripcion']
            }],
            order: [
                ['usuario_rolId', 'ASC']
            ]
        });
    }
}

list = async (req) => {
    let autorizado=await validarpermiso(req,MenuId,3);
    if(autorizado!==true){
        return autorizado;
    }
    
    if (!req.query.id && !req.query.estadoId && !req.query.usuarioId && !req.query.rolId) {
        response.code = 1;
        response.data = await consultar();
        return response;
    }

    const { id, estadoId,usuarioId,rolId} = req.query;
    let query = {};
    if (estadoId) {
        let estados = estadoId.split(';');
        let arrayEstado = new Array();
        estados.map((item) => {
            arrayEstado.push(Number(item));
        });
        query.estadoId = arrayEstado;
    }

    if(usuarioId){
        query.usuarioId=usuarioId;
    }
    
    if(rolId){
        query.rolId=rolId;
    }

    if (!id) {
        response.code = 1;
        response.data = await consultar(query);
        return response;
    } else {
        if (Number(id) > 0) {
            query.usuario_rolId = Number(id);
            response.code = 1;
            response.data = await consultar(query);
            return response;
        } else {
            response.code = -1;
            response.data = "Debe de especificar un codigo";
            return response;
        }
    }
}

const eliminar = async (req) => {
    let autorizado = await validarpermiso(req, MenuId, 4);
    if (autorizado !== true) {
        return autorizado;
    }
    let usuario_rolId = req.params.id;
    const dataAnterior = await Modelo.findOne({
        where: { usuario_rolId }
    });

    const dataEliminar = {
        estadoId: 3
    };
    if (dataAnterior) {
        const resultado = await Modelo.update(dataEliminar, {
            where: {
                usuario_rolId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            dataEliminar.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, usuario_rolId, dataAnterior.dataValues, dataEliminar);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod: usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    usuario_rolId
                }
            });

            response.code = 1;
            response.data = "Elemento eliminado exitosamente";
            return response;
        } else {
            response.code = -1;
            response.data = "No fue posible eliminar el elemento";
            return response;
        }
    } else {
        response.code = -1;
        response.data = "No existe información para eliminar con los parametros especificados";
        return response;
    }
}

const update = async (req) => {
    let autorizado=await validarpermiso(req,MenuId,2);
    if(autorizado!==true){
        return autorizado;
    }
    const { usuario_rolId,rolId} = req.body;
    if (rolId) {
        const existe = await Modelo.findOne(
            {
                where:
                {
                    rolId,
                    usuario_rolId: { [Op.ne]: usuario_rolId },
                    estadoId: { [Op.ne]: 3}
                },
                attributes: ['usuario_rolId']
            });

        if (existe) {
            response.code = -1;
            response.data = "El usuario ya tiene asignado dicho rol";
            return response;
        }
    }

    const dataAnterior = await Modelo.findOne({
        where: { usuario_rolId }
    });


    if (dataAnterior) {
        const resultado = await Modelo.update(req.body, {
            where: {
                usuario_rolId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            req.body.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, usuario_rolId, dataAnterior.dataValues, req.body);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod:usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    usuario_rolId
                }
            });

            response.code = 1;
            response.data = "Información Actualizado exitosamente";
            return response;
        } else {
            response.code = 0;
            response.data = "No existen cambios para aplicar";
            return response;
        }
    } else {
        response.code = -1;
        response.data = "No existe información para actualizar con los parametros especificados";
        return response;
    }
};

const prueba=async(req,res)=>{
    var pdf = require('html-pdf');
    var contenido = `
    <h1>Esto es un test de html-pdf</h1>
    <p>Estoy generando PDF a partir de este código HTML sencillo</p>
    `;

    const stream = await new Promise((resolve, reject) => {
        pdf.create(contenido).toBuffer((err, stream) => {
          if (err) {
            reject(reject);
            return;
          }
          resolve(stream);
        });
      });

      return stream;



}

module.exports = {
    list,
    insert,
    update,
    eliminar,
    prueba
}