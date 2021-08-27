const moment = require('moment');
var { Op } = require('sequelize');
const { UsuarioSedeDiaco, Rol, Estado, Usuario, SedeDiaco } = require('../../../store/db');
const { registrarBitacora } = require('../../../utils/bitacora_cambios');
const { validarpermiso } = require('../../../auth');
const MenuId=35;
const Modelo = UsuarioSedeDiaco;
const tabla = 'usuario_sede_diaco';
let response = {};

const insert = async (req) => {
    let autorizado=await validarpermiso(req,MenuId,1);
    if(autorizado!==true){
        return autorizado;
    }
    
    const { sede_diacoId,usuarioId } = req.body;
    const existe = await Modelo.findOne({ where: { sede_diacoId,usuarioId,estadoId: { [Op.ne]: 3} }, attributes: ['usuario_sede_diacoId'] });

    if (existe) {
        response.code = -1;
        response.data = "El usuario ya tiene asignada esta Sede";
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
                model: SedeDiaco,
                as: "SedeDiaco",
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
                ['usuario_sede_diacoId', 'ASC']
            ]
        });
    } else {
        return await Modelo.findAll({
            include: [{
                model: SedeDiaco,
                as: "SedeDiaco",
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
                ['usuario_sede_diacoId', 'ASC']
            ]
        });
    }
}

list = async (req) => {
    let autorizado=await validarpermiso(req,MenuId,3);
    if(autorizado!==true){
        return autorizado;
    }
    
    if (!req.query.id && !req.query.estadoId && !req.query.usuarioId && !req.query.sede_diacoId) {
        response.code = 1;
        response.data = await consultar();
        return response;
    }

    const { id, estadoId,usuarioId,sede_diacoId} = req.query;
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
    
    if(sede_diacoId){
        query.sede_diacoId=sede_diacoId;
    }

    if (!id) {
        response.code = 1;
        response.data = await consultar(query);
        return response;
    } else {
        if (Number(id) > 0) {
            query.usuario_sede_diacoId = Number(id);
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
    let usuario_sede_diacoId = req.params.id;
    const dataAnterior = await Modelo.findOne({
        where: { usuario_sede_diacoId }
    });

    const dataEliminar = {
        estadoId: 3
    };
    if (dataAnterior) {
        const resultado = await Modelo.update(dataEliminar, {
            where: {
                usuario_sede_diacoId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            dataEliminar.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, usuario_sede_diacoId, dataAnterior.dataValues, dataEliminar);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod: usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    usuario_sede_diacoId
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
    const { usuario_sede_diacoId,sede_diacoId} = req.body;
    if (sede_diacoId) {
        const existe = await Modelo.findOne(
            {
                where:
                {
                    sede_diacoId,
                    usuario_sede_diacoId: { [Op.ne]: usuario_sede_diacoId },
                    estadoId: { [Op.ne]: 3}
                },
                attributes: ['usuario_sede_diacoId']
            });

        if (existe) {
            response.code = -1;
            response.data = "El usuario ya tiene asignada dicha Sede";
            return response;
        }
    }

    const dataAnterior = await Modelo.findOne({
        where: { usuario_sede_diacoId }
    });


    if (dataAnterior) {
        const resultado = await Modelo.update(req.body, {
            where: {
                usuario_sede_diacoId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            req.body.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, usuario_sede_diacoId, dataAnterior.dataValues, req.body);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod:usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    usuario_sede_diacoId
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

module.exports = {
    list,
    insert,
    update,
    eliminar
}