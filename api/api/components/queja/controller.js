const moment = require('moment');
const { Queja,Municipio, EstadoQueja, Departamento, Sucursal } = require('../../../store/db');
const { registrarBitacora } = require('../../../utils/bitacora_cambios');
const { validarpermiso } = require('../../../auth');
const MenuId = 18;
const Modelo = Queja;
const tabla = 'queja';

const consultar = async (query, include = 1) => {
    if (include == 1) {
        if (query) {
            return await Modelo.findAll({
                include: [{
                    model: EstadoQueja,
                    as: "Estado",
                    required: true,
                    attributes: ['descripcion'],
                },
                {
                    model: Sucursal,
                    as: "Sucursal",
                    required: true,
                    attributes: ['nombre','municipioId']
                }],
                where: [query],
                order: [
                    ['quejaId', 'ASC']
                ]
            });
        } else {
            return await Modelo.findAll({
                include: [{
                    model: EstadoQueja,
                    as: "Estado",
                    required: true,
                    attributes: ['descripcion'],
                },
                {
                    model: Sucursal,
                    as: "Sucursal",
                    required: true,
                    attributes: ['nombre','municipioId']
                }],
                order: [
                    ['quejaId', 'ASC']
                ]
            });
        }
    } else {
        if (query) {
            return await Modelo.findAll({ where: query });
        } else {
            return await Modelo.findAll();
        }
    }
}

list = async (req) => {
    let response = {};
        let autorizado = await validarpermiso(req, MenuId, 3);
        if (autorizado !== true) {
            return autorizado;
        }
    const { include } = req.query;
    if (!req.query.id && !req.query.estadoId && !req.query.departamentoId) {
        response.code = 1;
        response.data = await await consultar(null, include);
        return response;
    }

    const { id, estadoId, departamentoId } = req.query;
    let query = {};
    if (estadoId) {
        let estados = estadoId.split(';');
        let arrayEstado = new Array();
        estados.map((item) => {
            arrayEstado.push(Number(item));
        });
        query.estadoId = arrayEstado;
    }

    if (departamentoId) {
        query.departamentoId = departamentoId;
    }
    if (!id) {
        response.code = 1;
        response.data = await consultar(query, include);
        return response;
    } else {
        if (Number(id) > 0) {
            query.quejaId = Number(id);
            response.code = 1;
            response.data = await consultar(query, include);
            return response;
        } else {
            response.code = -1;
            response.data = "Debe de especificar un codigo";
            return response;
        }
    }
}

const listReporte=async(req)=>{
    let response = {};
    response.code="-1";
    return response;
}
const update = async (req) => {
    let response = {};
    let autorizado = await validarpermiso(req, MenuId, 2);
    if (autorizado !== true) {
        return autorizado;
    }
    const { quejaId } = req.body;
    const dataAnterior = await Modelo.findOne({
        where: { quejaId }
    });


    if (dataAnterior) {
        const resultado = await Modelo.update(req.body, {
            where: {
                quejaId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            req.body.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, quejaId, dataAnterior.dataValues, req.body);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod: usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    quejaId
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
    update,
    listReporte
}