const moment = require('moment');
var { Op } = require('sequelize');
const { Sucursal,Comercio, Estado } = require('../../../store/db');
const { registrarBitacora } = require('../../../utils/bitacora_cambios');
const { validarpermiso } = require('../../../auth');
const MenuId = 31;
const Modelo = Sucursal;
const tabla = 'cat_sucursal';
let response = {};


const insert = async (req) => {
    let autorizado = await validarpermiso(req, MenuId, 1);
    if (autorizado !== true) {
        return autorizado;
    }
    const { comercioId,nombre } = req.body;
    const sucursalNombre = await Modelo.findOne({ where: { nombre,comercioId }, attributes: ['sucursalId'] });
    if (sucursalNombre) {
        response.code = 0;
        response.data = `El comercio ya tiene una sucursal con el nombre  ${nombre}, por favor verifique`;
        return response;
    } else {
        let { usuarioId } = req.user;
        req.body.usuario_crea = usuarioId;
        const result = await Modelo.create(req.body);
        response.code = 1;
        response.data = result;
        return response;
    }
}

const consultar = async (query, include = 1) => {
    if (include == 1) {
        if (query) {
            return await Sucursal.findAll({
                include: [
                    {
                        model: Comercio,
                        as: "Comercio",
                        required: true,
                        attributes: ['razon_social','nit','correo']
                    },{
                    model: Estado,
                    as: "Estado",
                    required: true,
                    attributes: ['descripcion']
                }],
                where: [query],
                order: [
                    ['sucursalId', 'ASC']
                ]
            });
        } else {
            return await Sucursal.findAll({
                include: [ {
                    model: Comercio,
                    as: "Comercio",
                    required: true,
                    attributes: ['razon_social','nit','correo']
                },{
                    model: Estado,
                    as: "Estado",
                    required: true,
                    attributes: ['descripcion']
                }],
                order: [
                    ['sucursalId', 'ASC']
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
    let autorizado = await validarpermiso(req, MenuId, 3);
    if (autorizado !== true) {
        return autorizado;
    }
    const { include } = req.query;
    if (!req.query.id && !req.query.estadoId && !req.query.comercioId) {
        response.code = 1;
        response.data = await consultar(null, include);
        return response;
    }

    const { id, estadoId, comercioId } = req.query;
    let query = {};
    if (estadoId) {
        let estados = estadoId.split(';');
        let arrayEstado = new Array();
        estados.map((item) => {
            arrayEstado.push(Number(item));
        });
        query.estadoId = arrayEstado;
    }
    if (comercioId) {
        query.comercioId = comercioId;
    }

    if (!id) {
        response.code = 1;
        response.data = await consultar(query, include);
        return response;
    } else {
        if (Number(id) > 0) {
            query.sucursalId = Number(id);
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
    let sucursalId = req.params.id;
    const dataAnterior = await Modelo.findOne({
        where: { sucursalId }
    });

    const dataEliminar = {
        estadoId: 3
    };
    if (dataAnterior) {
        const resultado = await Modelo.update(dataEliminar, {
            where: {
                sucursalId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            dataEliminar.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, sucursalId, dataAnterior.dataValues, dataEliminar);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod: usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    sucursalId
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
    const { nombre, sucursalId } = req.body;
    if (nombre) {
        const sucursalItem = await Modelo.findOne(
            {
                where:
                {
                    nombre,
                    sucursalId: { [Op.ne]: sucursalId }
                },
                attributes: ['sucursalId']
            });

        if (sucursalItem) {
            response.code = -1;
            response.data = `El comercio ya tiene una sucursal con el nombre  ${nombre}, por favor verifique`;
            return response;
        }
    }

    const dataAnterior = await Modelo.findOne({
        where: { sucursalId }
    });
    if (req.body.correo) {
        req.body.correo = req.body.correo.toLowerCase();
    }
    if (dataAnterior) {
        const resultado = await Modelo.update(req.body, {
            where: {
                sucursalId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            req.body.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, sucursalId, dataAnterior.dataValues, req.body);
            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod: usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    sucursalId
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