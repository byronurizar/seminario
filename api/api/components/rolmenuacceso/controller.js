const moment = require('moment');
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');
const { RolMenuAcceso, Menu, MenuAcceso,Acceso, Estado, bd } = require('../../../store/db');
const { registrarBitacora } = require('../../../utils/bitacora_cambios');
const { validarpermiso } = require('../../../auth');
const MenuId = 20;
const Modelo = RolMenuAcceso;
const tabla = 'rol_menu_acceso';
let response = {};

const insert = async (req) => {
    let autorizado = await validarpermiso(req, MenuId, 1);
    if (autorizado !== true) {
        return autorizado;
    }
    let { usuarioId } = req.user;
    req.body.usuario_crea = usuarioId;
    const{rolId,menu_accesoId}=req.body;
    const dataActual = await Modelo.findOne({
        where: { rolId,menu_accesoId }
    });

    if(!dataActual){
        const result = await Modelo.create(req.body);
        response.code = 1;
        response.data = result;
    }else{
        response.code = -1;
        response.data = "El rol ya tiene asignado el acceso";
    }
    return response;
}

const consultar = async (query, include = 1) => {
    if (include == 1) {
        if (query) {
            return await Modelo.findAll({
                include: [{
                    model: MenuAcceso,
                    as: "MenuAcceso",
                    required: true,
                    attributes: ['menu_accesoId','menuId','accesoId'],
                    include: [
                        {
                        model: Menu,
                        as:'Menu',
                        required: true,
                        attributes: ['menuId','menu_padreId','descripcion', 'estadoId'],
                    },
                    {
                        model: Acceso,
                        as:'Acceso',
                        required: true,
                        attributes: ['accesoId', 'descripcion', 'estadoId'],
                    }
                ]
                },{
                    model: Estado,
                    as: "Estado",
                    required: true,
                    attributes: ['descripcion'],
                }],
                where: [query],
                order: [
                    ['rol_menu_accesoId', 'ASC']
                ]
            });
        } else {
            return await Modelo.findAll({
                include: [{
                    model: MenuAcceso,
                    as: "MenuAcceso",
                    required: true,
                    attributes: ['menu_accesoId','menuId','accesoId'],
                    include: [
                        {
                        model: Menu,
                        as:'Menu',
                        required: true,
                        attributes: ['menuId','menu_padreId','descripcion', 'estadoId'],
                    },
                    {
                        model: Acceso,
                        as:'Acceso',
                        required: true,
                        attributes: ['accesoId', 'descripcion', 'estadoId'],
                    }
                ]
                },{
                    model: Estado,
                    as: "Estado",
                    required: true,
                    attributes: ['descripcion'],
                }],
                order: [
                    ['rol_menu_accesoId', 'ASC']
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
    if (!req.query.id && !req.query.estadoId && !req.query.rolId && !req.query.menu_accesoId && !req.query.menuId) {
        response.code = 1;
        response.data = await consultar(null,include);
        return response;
    }

    const { id, estadoId,rolId,menu_accesoId,menuId } = req.query;
    if(menuId && rolId){
        return await listAccesoMenuId(menuId,rolId);
    }
    let query = {};
    if (estadoId) {
        let estados = estadoId.split(';');
        let arrayEstado = new Array();
        estados.map((item) => {
            arrayEstado.push(Number(item));
        });
        query.estadoId = arrayEstado;
    }

    if(rolId){
        query.rolId = rolId;
    }

    if(menu_accesoId){
        query.menu_accesoId = menu_accesoId;
    }

    if (!id) {
        response.code = 1;
        response.data = await consultar(query,include);
        return response;
    } else {
        if (Number(id) > 0) {
            query.tipo_documentoId = Number(id);
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

const listAccesoMenuId=async(menuId,rolId)=>{
response.code=1;
response.data=await RolMenuAcceso.findAll({
    where:sequelize.literal(`rol_menu_acceso.menu_accesoId in(select menu_accesoId from menu_acceso where menuId=${menuId}) and rol_menu_acceso.rolId=${rolId};`)
});
return response;
}

const listAccesos = async (req) => {
    let autorizado=await validarpermiso(req,MenuId,3);
    if(autorizado!==true){
        return autorizado;
    }
    const {usuarioId}=req.user;
    response.code=1;
    response.data=await bd.query(`select distinct b.menuId,b.accesoId from rol_menu_acceso a 
    inner join menu_acceso b
    on a.menu_accesoId=b.menu_accesoId and a.estadoId=1 and b.estadoId=1
    inner join usuario_rol c
    on a.rolId=c.rolId and c.estadoId=1
    inner join cat_acceso d
    on b.accesoId=d.accesoId and d.estadoId=1
    where c.usuarioId=${usuarioId};`, {
        type: QueryTypes.SELECT
    });
    return response;
}

const update = async (req) => {
    let autorizado = await validarpermiso(req, MenuId, 2);
    if (autorizado !== true) {
        return autorizado;
    }
    const { rol_menu_accesoId,menu_accesoId } = req.body;
    const dataAnterior = await Modelo.findOne({
        where: { rol_menu_accesoId }
    });


    if (dataAnterior) {
        const {menu_accesoId:menu_accesoIdActual,rolId }=dataAnterior;

        const validarAcceso = await Modelo.findOne({
            where: { menu_accesoId,rolId }
        });

        if(validarAcceso && menu_accesoId!==menu_accesoIdActual){
            response.code = 0;
            response.data = "El acceso que intenta actualizar, el rol ya lo tiene asignado por favor verifique";
            return response;
        }

        const resultado = await Modelo.update(req.body, {
            where: {
                rol_menu_accesoId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            req.body.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, rol_menu_accesoId, dataAnterior.dataValues, req.body);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod:usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    rol_menu_accesoId,
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

const eliminar = async (req) => {
    let autorizado = await validarpermiso(req, MenuId, 4);
    if (autorizado !== true) {
        return autorizado;
    }
    let rol_menu_accesoId = req.params.id;
    const dataAnterior = await Modelo.findOne({
        where: { rol_menu_accesoId }
    });

    const dataEliminar = {
        estadoId: 3
    };
    if (dataAnterior) {
        const resultado = await Modelo.update(dataEliminar, {
            where: {
                rol_menu_accesoId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            dataEliminar.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, rol_menu_accesoId, dataAnterior.dataValues, dataEliminar);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod: usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    rol_menu_accesoId
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

module.exports = {
    list,
    update,
    insert,
    eliminar,
    listAccesos
}