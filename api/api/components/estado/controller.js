const { Estado } = require('../../../store/db');
const { registrarBitacora } = require('../../../utils/bitacora_cambios');
const { validarpermiso } = require('../../../auth');
const MenuId=2;

const Modelo = Estado;
const tabla = 'cat_estado';
let response = {};

const insert = async (req) => {
    let autorizado=await validarpermiso(req,MenuId,1);
    if(autorizado!==true){
        return autorizado;
    }

    const result = await Modelo.create(req.body);
    response.code = 1;
    response.data = result;
    return response;
}

list = async (req) => {
    let autorizado=await validarpermiso(req,MenuId,3);
    if(autorizado!==true){
        return autorizado;
    }
       
    response.code = 1;
    response.data = await Modelo.findAll({ where: { activo: true } });
    return response;
}

const update = async (req) => {
    let autorizado=await validarpermiso(req,MenuId,2);
    if(autorizado!==true){
        return autorizado;
    }

    const { estadoId } = req.body;
    const dataAnterior = await Modelo.findOne({
        where: { estadoId }
    });

    if (dataAnterior) {
        const resultado = await Modelo.update(req.body, {
            where: {
                estadoId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            req.body.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, estadoId, dataAnterior.dataValues, req.body);
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
    update
}