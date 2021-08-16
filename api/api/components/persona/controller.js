const moment = require('moment');
var { Op } = require('sequelize');
const { Persona, Estado, Genero } = require('../../../store/db');
const { registrarBitacora } = require('../../../utils/bitacora_cambios');
const { validarpermiso } = require('../../../auth');
const MenuId = 12;
const Modelo = Persona;
const tabla = 'persona';
let response = {};


const insert = async (req) => {
    let autorizado = await validarpermiso(req, MenuId, 1);
    if (autorizado !== true) {
        return autorizado;
    }
    const { email } = req.body;
    const persona = await Modelo.findOne({ where: { email }, attributes: ['personaId'] });

    if (persona) {
        response.code = 0;
        response.data = "El correo electrónico enviado ya existe, por favor verifique";
        return response;
    }

    let { usuarioId } = req.user;
    req.body.email=req.body.email.toLowerCase();
    req.body.usuario_crea = usuarioId;
    const result = await Modelo.create(req.body);
    response.code = 1;
    response.data = result;
    return response;
}

const consultar = async (query, include = 1) => {
    if (include == 1) {
        if (query) {
            return await Persona.findAll({
                include: [{
                    model: Estado,
                    as: "Estado",
                    required: true,
                    attributes: ['descripcion']
                }, {
                    model: Genero,
                    as: "Genero",
                    required: true,
                    attributes: ['descripcion']
                }],
                where: [query],
                order: [
                    ['personaId', 'ASC']
                ]
            });
        } else {
            return await Persona.findAll({
                include: [{
                    model: Estado,
                    as: "Estado",
                    required: true,
                    attributes: ['descripcion']
                }, {
                    model: Genero,
                    as: "Genero",
                    required: true,
                    attributes: ['descripcion']
                }],
                order: [
                    ['personaId', 'ASC']
                ]
            });
        }
    } else {
        if (query) {
            return await Persona.findAll({ where: query });
        } else {
            return await Persona.findAll();
        }
    }
}

list = async (req) => {
    let autorizado = await validarpermiso(req, MenuId, 3);
    if (autorizado !== true) {
        return autorizado;
    }
    const { include } = req.query;
    if (!req.query.id && !req.query.estadoId && !req.query.generoId && !req.query.email) {
        response.code = 1;
        response.data = await consultar(null, include);
        return response;
    }

    const { id, estadoId, generoId, email } = req.query;
    let query = {};
    if (estadoId) {
        let estados = estadoId.split(';');
        let arrayEstado = new Array();
        estados.map((item) => {
            arrayEstado.push(Number(item));
        });
        query.estadoId = arrayEstado;
    }
    if (generoId) {
        query.generoId = generoId;
    }

    if (email) {
        query.email = email;
    }
    if (!id) {
        response.code = 1;
        response.data = await consultar(query, include);
        return response;
    } else {
        if (Number(id) > 0) {
            query.personaId = Number(id);
            response.code = 1;
            response.data = await await consultar(query, include);
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
    let personaId = req.params.id;
    const dataAnterior = await Modelo.findOne({
        where: { personaId }
    });

    const dataEliminar = {
        estadoId: 3
    };
    if (dataAnterior) {
        const resultado = await Modelo.update(dataEliminar, {
            where: {
                personaId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            dataEliminar.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, personaId, dataAnterior.dataValues, dataEliminar);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod: usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    personaId
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
    const { personaId, email } = req.body;
    if (email) {
        const persona = await Modelo.findOne(
            {
                where:
                {
                    email,
                    personaId: { [Op.ne]: personaId }
                },
                attributes: ['personaId']
            });

        if (persona) {
            response.code = -1;
            response.data = "El nuevo correo electrónico enviado ya existe, por favor verifique";
            return response;
        }
    }

    const dataAnterior = await Modelo.findOne({
        where: { personaId }
    });
    if(req.body.email){
        req.body.email=req.body.email.toLowerCase();
    }
    if (dataAnterior) {
        const resultado = await Modelo.update(req.body, {
            where: {
                personaId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            req.body.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, personaId, dataAnterior.dataValues, req.body);
            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod: usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    personaId
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