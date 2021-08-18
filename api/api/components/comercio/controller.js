const moment = require('moment');
var { Op } = require('sequelize');
const { Comercio, Estado } = require('../../../store/db');
const { registrarBitacora } = require('../../../utils/bitacora_cambios');
const { validarpermiso } = require('../../../auth');
const MenuId = 30;
const Modelo = Comercio;
const tabla = 'cat_comercio';
let response = {};


const insert = async (req) => {
    let autorizado = await validarpermiso(req, MenuId, 1);
    if (autorizado !== true) {
        return autorizado;
    }
    const { razon_social, nit, nombre } = req.body;
    const comercioNombre = await Modelo.findOne({ where: { nombre }, attributes: ['comercioId'] });
    if (comercioNombre) {
        response.code = 0;
        response.data = "El nombre del Comercio ya existe, por favor verifique";
        return response;
    } else {
        const comercio = await Modelo.findOne({ where: { razon_social }, attributes: ['comercioId'] });

        if (comercio) {
            response.code = 0;
            response.data = "La razon social del Comercio ya existe, por favor verifique";
            return response;
        } else {
            let auxNit = String(nit).trim().replace("-", "");
            const comercioNit = await Modelo.findOne({ where: { nit: auxNit }, attributes: ['comercioId'] });
            if (comercioNit) {
                response.code = 0;
                response.data = "El Nit del Comercio ya existe, por favor verifique";
                return response;
            } else {
                let { usuarioId } = req.user;
                req.body.correo = req.body.correo.toLowerCase();
                req.body.usuario_crea = usuarioId;
                const result = await Modelo.create(req.body);
                response.code = 1;
                response.data = result;
                return response;
            }
        }
    }
}

const consultar = async (query, include = 1) => {
    if (include == 1) {
        if (query) {
            return await Comercio.findAll({
                include: [{
                    model: Estado,
                    as: "Estado",
                    required: true,
                    attributes: ['descripcion']
                }],
                where: [query],
                order: [
                    ['comercioId', 'ASC']
                ]
            });
        } else {
            return await Comercio.findAll({
                include: [{
                    model: Estado,
                    as: "Estado",
                    required: true,
                    attributes: ['descripcion']
                }],
                order: [
                    ['comercioId', 'ASC']
                ]
            });
        }
    } else {
        if (query) {
            return await Comercio.findAll({ where: query });
        } else {
            return await Comercio.findAll();
        }
    }
}

list = async (req,isPublico=false) => {
    if(!isPublico){
    let autorizado = await validarpermiso(req, MenuId, 3);
    if (autorizado !== true) {
        return autorizado;
    }
}
    const { include } = req.query;
    if (!req.query.id && !req.query.estadoId && !req.query.email && !req.query.nit) {
        response.code = 1;
        response.data = await consultar(null, include);
        return response;
    }

    const { id, estadoId, nit } = req.query;
    let query = {};
    if (estadoId) {
        let estados = estadoId.split(';');
        let arrayEstado = new Array();
        estados.map((item) => {
            arrayEstado.push(Number(item));
        });
        query.estadoId = arrayEstado;
    }
    if (nit) {
        query.nit = String(nit).trim().replace("-", "");
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
            query.comercioId = Number(id);
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
    let comercioId = req.params.id;
    const dataAnterior = await Modelo.findOne({
        where: { comercioId }
    });

    const dataEliminar = {
        estadoId: 3
    };
    if (dataAnterior) {
        const resultado = await Modelo.update(dataEliminar, {
            where: {
                comercioId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            dataEliminar.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, comercioId, dataAnterior.dataValues, dataEliminar);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod: usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    comercioId
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
    const { comercioId, razon_social, nit } = req.body;
    if (razon_social) {
        const comercio = await Modelo.findOne(
            {
                where:
                {
                    razon_social,
                    comercioId: { [Op.ne]: comercioId }
                },
                attributes: ['comercioId']
            });

        if (comercio) {
            response.code = -1;
            response.data = "La razon social ya existe, por favor verifique";
            return response;
        }
    }
    if (nit) {
        const comercio = await Modelo.findOne(
            {
                where:
                {
                    nit: String(nit).trim().replace("-", ""),
                    comercioId: { [Op.ne]: comercioId }
                },
                attributes: ['comercioId']
            });

        if (comercio) {
            response.code = -1;
            response.data = "El nit del comercio ya existe por favor verifique";
            return response;
        }
    }

    const dataAnterior = await Modelo.findOne({
        where: { comercioId }
    });
    if (req.body.correo) {
        req.body.correo = req.body.correo.toLowerCase();
    }
    if (dataAnterior) {
        const resultado = await Modelo.update(req.body, {
            where: {
                comercioId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            req.body.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, comercioId, dataAnterior.dataValues, req.body);
            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod: usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    comercioId
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