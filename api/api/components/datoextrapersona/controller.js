const moment = require('moment');
var { Op } = require('sequelize');
const { registrarBitacora } = require('../../../utils/bitacora_cambios');
const { DatoExtraPersona, TipoSangre, EstadoCivil, Estado } = require('../../../store/db');
const { validarpermiso } = require('../../../auth');
const MenuId=16;
const Modelo = DatoExtraPersona;
const tabla = 'dato_extra_persona';
let response = {};

const insert = async (req) => {
    let autorizado=await validarpermiso(req,MenuId,1);
    if(autorizado!==true){
        return autorizado;
    }
    const{personaId}=req.body;
    const dataAnterior = await Modelo.findOne({
        where: { personaId,estadoId: { [Op.ne]: 3}}
    });

    if(dataAnterior){
        response.code=0;
        response.data='La persona ya tiene información extra registrada, por favor verifique';
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
        return await DatoExtraPersona.findAll({
            include: [{
                model: TipoSangre,
                as: "TipoSangre",
                required: false,
                attributes: ['descripcion']
            },{
                model: EstadoCivil,
                as: "EstadoCivil",
                required: false,
                attributes: ['descripcion']
            }, {
                model: Estado,
                as: "Estado",
                required: true,
                attributes: ['descripcion']
            }],
            where: [query],
            order: [
                ['dato_extra_personaId', 'ASC']
            ]
        });
    } else {
        return await DatoExtraPersona.findAll({
            include: [{
                model: TipoSangre,
                as: "TipoSangre",
                required: false,
                attributes: ['descripcion']
            },{
                model: EstadoCivil,
                as: "EstadoCivil",
                required: false,
                attributes: ['descripcion']
            }, {
                model: Estado,
                as: "Estado",
                required: true,
                attributes: ['descripcion']
            }],
            order: [
                ['dato_extra_personaId', 'ASC']
            ]
        });
    }
}

const list = async (req) => {
    let autorizado=await validarpermiso(req,MenuId,3);
    if(autorizado!==true){
        return autorizado;
    }
    
    if (!req.query.id && !req.query.estadoId && !req.query.personaId && !req.query.tiposangreId && !req.query.estadocivilId) {
        response.code = 1;
        response.data = await consultar();
        return response;
    }

    const { id, estadoId,personaId,tiposangreId,estadocivilId} = req.query;
    let query = {};
    if (estadoId) {
        let estados = estadoId.split(';');
        let arrayEstado = new Array();
        estados.map((item) => {
            arrayEstado.push(Number(item));
        });
        query.estadoId = arrayEstado;
    }
    if(personaId){
        query.personaId=personaId;
    }

    if(tiposangreId){
        query.tipo_sangreId=tiposangreId;
    }

    if(estadocivilId){
        query.estado_civilId=estadocivilId;
    }

    if (!id) {
        response.code = 1;
        response.data = await  consultar(query);
        return response;
    } else {
        if (Number(id) > 0) {
            query.dato_extra_personaId = Number(id);
            response.code = 1;
            response.data = await  consultar(query);
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
    let dato_extra_personaId = req.params.id;
    const dataAnterior = await Modelo.findOne({
        where: { dato_extra_personaId }
    });

    const dataEliminar = {
        estadoId: 3
    };
    if (dataAnterior) {
        const resultado = await Modelo.update(dataEliminar, {
            where: {
                dato_extra_personaId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            dataEliminar.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, dato_extra_personaId, dataAnterior.dataValues, dataEliminar);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod: usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    dato_extra_personaId
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
    const { dato_extra_personaId } = req.body;
    const dataAnterior = await Modelo.findOne({
        where: { dato_extra_personaId }
    });


    if (dataAnterior) {
        const resultado = await Modelo.update(req.body, {
            where: {
                dato_extra_personaId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            req.body.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, dato_extra_personaId, dataAnterior.dataValues, req.body);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod:usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    dato_extra_personaId
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