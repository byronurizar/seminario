const moment = require('moment');
const { DireccionPersona, Municipio, Departamento, Estado } = require('../../../store/db');
const { registrarBitacora } = require('../../../utils/bitacora_cambios');
const { validarpermiso } = require('../../../auth');
const MenuId = 15;
const Modelo = DireccionPersona;
const tabla = 'direccion_persona';
let response = {};

const insert = async (req) => {
    let autorizado = await validarpermiso(req, MenuId, 1);
    if (autorizado !== true) {
        return autorizado;
    }

    let { usuarioId } = req.user;
    req.body.usuario_crea = usuarioId;
    const result = await Modelo.create(req.body);
    response.code = 1;
    response.data = result;
    return response;
}

const consultar = async (query) => {
    if (query) {
        return await DireccionPersona.findAll({
            include: [{
                model: Municipio,
                as: "Municipio",
                required: false,
                attributes: ['municipioId', 'municipioId_depto', 'descripcion', 'estadoId'],
                include: [{
                    model: Departamento,
                    as: "Departamento",
                    required: true,
                    attributes: ['departamentoId', 'paisId', 'descripcion', 'estadoId'],
                }],
            }, {
                model: Estado,
                as: "Estado",
                required: true,
                attributes: ['descripcion']
            }],
            where: [query],
            order: [
                ['direccion_personaId', 'ASC']
            ]
        });
    } else {
        return await DireccionPersona.findAll({
            include: [{
                model: Municipio,
                as: "Municipio",
                required: false,
                attributes: ['municipioId', 'municipioId_depto', 'descripcion', 'estadoId'],
                include: [{
                    model: Departamento,
                    as: "Departamento",
                    required: true,
                    attributes: ['departamentoId', 'paisId', 'descripcion', 'estadoId'],
                }],
            }, {
                model: Estado,
                as: "Estado",
                required: true,
                attributes: ['descripcion']
            }],
            order: [
                ['direccion_personaId', 'ASC']
            ]
        });
    }
}

list = async (req) => {
    let autorizado = await validarpermiso(req, MenuId, 3);
    if (autorizado !== true) {
        return autorizado;
    }

    if (!req.query.id && !req.query.estadoId && !req.query.personaId && !req.query.municipioId) {
        response.code = 1;
        response.data = await consultar();
        return response;
    }

    const { id, estadoId, personaId, municipioId } = req.query;
    let query = {};
    if (estadoId) {
        let estados = estadoId.split(';');
        let arrayEstado = new Array();
        estados.map((item) => {
            arrayEstado.push(Number(item));
        });
        query.estadoId = arrayEstado;
    }
    if (personaId) {
        query.personaId = personaId;
    }

    if (municipioId) {
        query.municipioId = municipioId;
    }


    if (!id) {
        response.code = 1;
        response.data = await consultar(query);
        return response;
    } else {
        if (Number(id) > 0) {
            query.direccion_personaId = Number(id);
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
    let direccion_personaId = req.params.id;
    const dataAnterior = await Modelo.findOne({
        where: { direccion_personaId }
    });

    const dataEliminar = {
        estadoId: 3
    };
    if (dataAnterior) {
        const resultado = await Modelo.update(dataEliminar, {
            where: {
                direccion_personaId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            dataEliminar.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, direccion_personaId, dataAnterior.dataValues, dataEliminar);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod: usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    direccion_personaId
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
    let autorizado = await validarpermiso(req, MenuId, 2);
    if (autorizado !== true) {
        return autorizado;
    }
    const { direccion_personaId } = req.body;
    const dataAnterior = await Modelo.findOne({
        where: { direccion_personaId }
    });


    if (dataAnterior) {
        const resultado = await Modelo.update(req.body, {
            where: {
                direccion_personaId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            req.body.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, direccion_personaId, dataAnterior.dataValues, req.body);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod: usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    direccion_personaId
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
    insert,
    eliminar
}