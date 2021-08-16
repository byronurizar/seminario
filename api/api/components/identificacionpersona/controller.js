const moment = require('moment');
var { Op } = require('sequelize');
const { IdentificacionPersona, TipoDocumento, Estado } = require('../../../store/db');
const { registrarBitacora } = require('../../../utils/bitacora_cambios');
const { validarpermiso } = require('../../../auth');
const MenuId = 13;
const Modelo = IdentificacionPersona;
const tabla = 'identificacion_persona';
let response = {};

const insert = async (req) => {
    let autorizado = await validarpermiso(req, MenuId, 1);
    if (autorizado !== true) {
        return autorizado;
    }

    const { numero_identificacion } = req.body;
    const existe = await Modelo.findOne({ where: { numero_identificacion,estadoId: { [Op.ne]: 3} }, attributes: ['identificacion_personaId'] });

    if (existe) {
        response.code = -1;
        response.data = "El número de identificación ya existe por favor verifique";
        return response;
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
        return await IdentificacionPersona.findAll({
            include: [{
                model: TipoDocumento,
                as: "TipoDocumento",
                required: true,
                attributes: ['tipo_documentoId', 'descripcion', 'estadoId'],
            },
            {
                model: Estado,
                as: "Estado",
                required: true,
                attributes: ['descripcion']
            }],
            where: [query],
            order: [
                ['identificacion_personaId', 'ASC']
            ]
        });
    } else {
        return await IdentificacionPersona.findAll({
            include: [{
                model: TipoDocumento,
                as: "TipoDocumento",
                required: true,
                attributes: ['tipo_documentoId', 'descripcion', 'estadoId'],
            }, {
                model: Estado,
                as: "Estado",
                required: true,
                attributes: ['descripcion'],
            }],
            order: [
                ['identificacion_personaId', 'ASC']
            ]
        });
    }
}

list = async (req) => {
    let autorizado = await validarpermiso(req, MenuId, 3);
    if (autorizado !== true) {
        return autorizado;
    }

    if (!req.query.id && !req.query.estadoId && !req.query.personaId && !req.query.tipodocumentoId) {
        response.code = 1;
        response.data = await consultar();;
        return response;
    }

    const { id, estadoId, personaId, tipodocumentoId } = req.query;
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

    if (tipodocumentoId) {
        query.tipo_documentoId = tipodocumentoId;
    }

    if (id) {
        if (Number(id) > 0) {
            query.identificacion_personaId = Number(id);
        } else {
            response.code = -1;
            response.data = "Debe de especificar un codigo";
            return response;
        }
    }
    response.code = 1;
    response.data = await consultar(query);// Modelo.findAll({ where: query});
    return response;
}

const eliminar = async (req) => {
    let autorizado = await validarpermiso(req, MenuId, 4);
    if (autorizado !== true) {
        return autorizado;
    }
    let identificacion_personaId = req.params.id;
    const dataAnterior = await Modelo.findOne({
        where: { identificacion_personaId }
    });

    const dataEliminar = {
        estadoId: 3
    };
    if (dataAnterior) {
        const resultado = await Modelo.update(dataEliminar, {
            where: {
                identificacion_personaId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            dataEliminar.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, identificacion_personaId, dataAnterior.dataValues, dataEliminar);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod: usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    identificacion_personaId
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

    const { identificacion_personaId, numero_identificacion } = req.body;
    if (numero_identificacion) {
        const existe = await Modelo.findOne(
            {
                where:
                {
                    numero_identificacion,
                    identificacion_personaId: { [Op.ne]: identificacion_personaId },
                    estadoId: { [Op.ne]: 3}
                },
                attributes: ['identificacion_personaId']
            });

        if (existe) {
            response.code = -1;
            response.data = "El nuevo número de identificación ya existe, por favor verifique";
            return response;
        }
    }
    const dataAnterior = await Modelo.findOne({
        where: { identificacion_personaId }
    });


    if (dataAnterior) {
        const resultado = await Modelo.update(req.body, {
            where: {
                identificacion_personaId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            req.body.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, identificacion_personaId, dataAnterior.dataValues, req.body);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod: usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    identificacion_personaId
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