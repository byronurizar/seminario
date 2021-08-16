const moment = require('moment');
const { MenuAcceso, Estado, Acceso, Menu } = require('../../../store/db');
const { registrarBitacora } = require('../../../utils/bitacora_cambios');
const { validarpermiso } = require('../../../auth');
const MenuId=19;
const Modelo = MenuAcceso;
const tabla = 'menu_acceso';
let response = {};

const insert = async (req) => {
    let autorizado=await validarpermiso(req,MenuId,1);
    if(autorizado!==true){
        return autorizado;
    }
    
    let { usuarioId } = req.user;
    req.body.usuario_crea = usuarioId;
    const{menuId,accesoId}=req.body;
    const dataActual = await Modelo.findOne({
        where: { menuId,accesoId }
    });

    if(!dataActual){
        const result = await Modelo.create(req.body);
        response.code = 1;
        response.data = result;
    }else{
        response.code = -1;
        response.data = "El acceso ya asignado";
    }
    return response;

  
}

const consultar = async (query, include = 1) => {
    if (include == 1) {
        if (query) {
            return await Modelo.findAll({
                include: [
                    {
                        model: Menu,
                        as: "Menu",
                        required: true,
                        attributes: ['descripcion'],
                        where:[{estadoId:1}]
                    },{
                    model: Acceso,
                    as: "Acceso",
                    required: true,
                    attributes: ['descripcion'],
                    where:[{estadoId:1}]
                },{
                    model: Estado,
                    as: "Estado",
                    required: true,
                    attributes: ['descripcion'],
                }],
                where: [query],
                order: [
                    ['menu_accesoId', 'ASC']
                ]
            });
        } else {
            return await Modelo.findAll({
                include: [{
                    model: Menu,
                    as: "Menu",
                    required: true,
                    attributes: ['descripcion'],
                    where:[{estadoId:1}]
                },{
                    model: Acceso,
                    as: "Acceso",
                    required: true,
                    attributes: ['descripcion'],
                    where:[{estadoId:1}]
                },{
                    model: Estado,
                    as: "Estado",
                    required: true,
                    attributes: ['descripcion'],
                }],
                order: [
                    ['menu_accesoId', 'ASC']
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
    let autorizado=await validarpermiso(req,MenuId,3);
    if(autorizado!==true){
        return autorizado;
    }
    const { include } = req.query;
    if (!req.query.id && !req.query.estadoId && !req.query.menuId && !req.query.accesoId) {
        response.code = 1;
        response.data = await consultar(null,include);
        return response;
    }

    const { id, estadoId,menuId,accesoId } = req.query;
    let query = {};
    if (estadoId) {
        let estados = estadoId.split(';');
        let arrayEstado = new Array();
        estados.map((item) => {
            arrayEstado.push(Number(item));
        });
        query.estadoId = arrayEstado;
    }

    if(menuId){
        query.menuId=menuId;
    }

    if(accesoId){
        query.accesoId=accesoId;
    }

    if (!id) {
        response.code = 1;
        response.data =  await consultar(query,include);
        return response;
    } else {
        if (Number(id) > 0) {
            query.menu_accesoId = Number(id);
            response.code = 1;
            response.data = await consultar(query,include);
            return response;
        } else {
            response.code = -1;
            response.data = "Debe de especificar un codigo";
            return response;
        }
    }
}

const update = async (req) => {
    let autorizado=await validarpermiso(req,MenuId,2);
    if(autorizado!==true){
        return autorizado;
    }
    const { menu_accesoId,accesoId } = req.body;

    const dataAnterior = await Modelo.findOne({
        where: { menu_accesoId}
    });

    if (dataAnterior) {
        const {menuId,accesoId:accesoIdActual }=dataAnterior;

        const validarAcceso = await Modelo.findOne({
            where: { menuId,accesoId }
        });

        if(validarAcceso && accesoId!==accesoIdActual){
            response.code = 0;
            response.data = "El acceso que intenta actualizar ya existe por favor verifique";
            return response;
        }
        const resultado = await Modelo.update(req.body, {
            where: {
                menu_accesoId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            req.body.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, menu_accesoId, dataAnterior.dataValues, req.body);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod:usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    menu_accesoId
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
    insert
}