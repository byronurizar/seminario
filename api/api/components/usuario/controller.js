const moment = require('moment');
const bcrypt = require('bcrypt')
var sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');
const { Usuario, Estado, Persona,Rol, bd, FotoUsuario } = require('../../../store/db');
const { registrarBitacora } = require('../../../utils/bitacora_cambios');
const { validarpermiso } = require('../../../auth');
const MenuId = 17;
const Modelo = Usuario;
const tabla = 'usuario';
let response = {};

const insert = async (req) => {
    let autorizado = await validarpermiso(req, MenuId, 1);
    if (autorizado !== true) {
        return autorizado;
    }

    const dataUsuario = req.body;
    let { usuarioId } = req.user;

    const { dias_cambio_password } = req.body;
    if (dias_cambio_password === 0) {
        delete req.body.fecha_cambio_password;
    }
    dataUsuario.usuario_crea = usuarioId;
    const password = dataUsuario.password;
    dataUsuario.password = bcrypt.hashSync(password, 10);
    const result = await Modelo.create(dataUsuario);
    response.code = 1;
    response.data = result;
    return response;
}

const consultar = async (query, include = 1) => {
    if (include == 1) {
        if (query) {
            return await Modelo.findAll({
                include: [
                    {
                        model: Persona,
                        required: true,
                        as: "Persona",
                        attributes: ['nombre1', 'nombre2', 'nombre_otros', 'apellido1', 'apellido2', 'apellido_casada', 'email']
                    }, {
                        model: Estado,
                        as: "Estado",
                        required: true,
                        attributes: ['descripcion']
                    }],
                where: [query],
                order: [
                    ['usuarioId', 'ASC']
                ],
                attributes: ['usuarioId', 'personaId', 'user_name', 'fecha_cambio_password', 'fecha_crea', 'estadoId', 'forzar_cambio_password', 'dias_cambio_password']
            });
        } else {
            return await Modelo.findAll({
                include: [{
                    model: Persona,
                    required: true,
                    as: "Persona",
                    attributes: ['nombre1', 'nombre2', 'nombre_otros', 'apellido1', 'apellido2', 'apellido_casada', 'email']
                }, {
                    model: Estado,
                    as: "Estado",
                    required: true,
                    attributes: ['descripcion']
                }],
                order: [
                    ['usuarioId', 'ASC']
                ],
                attributes: ['usuarioId', 'personaId', 'user_name', 'fecha_cambio_password', 'fecha_crea', 'estadoId', 'forzar_cambio_password', 'dias_cambio_password']
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
    if (!req.query.id && !req.query.estadoId && !req.query.personaId) {
        response.code = 1;
        response.data = await consultar(null, include);
        return response;
    }

    const { id, estadoId, personaId } = req.query;
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


    if (!id) {
        response.code = 1;
        response.data = await consultar(query, include);
        return response;
    } else {
        if (Number(id) > 0) {
            query.usuarioId = Number(id);
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

const listAccesos = async (usuarioId) => {
    return await bd.query(`select distinct b.menuId,b.accesoId from rol_menu_acceso a 
    inner join menu_acceso b
    on a.menu_accesoId=b.menu_accesoId and a.estadoId=1 and b.estadoId=1
    inner join usuario_rol c
    on a.rolId=c.rolId and c.estadoId=1
    inner join cat_acceso d
    on b.accesoId=d.accesoId and d.estadoId=1
    where c.usuarioId=${usuarioId} and a.rolId in(
        select rolId from cat_rol where estadoId=1
    )  and b.menuId in (
        select menuId from cat_menu where estadoId=1
    )`, {
        type: QueryTypes.SELECT
    });
}

const listmenu = async (usuarioId) => {
    const menuUsuario = await bd.query(`select distinct a.menuId as id,a.posicion,a.descripcion as title,a.href as url,a.icono as icon,a.menu_padreId,a.classes,a.type,a.visible from cat_menu a
                inner join menu_acceso b
                on a.menuId=b.menuId and a.estadoId=1 and b.estadoId=1
                inner join rol_menu_acceso c
                on b.menu_accesoId=c.menu_accesoId and c.estadoId=1
                inner join usuario_rol d
                on c.rolId=d.rolId and d.estadoId=1
                where d.usuarioId=${usuarioId}  and c.rolId in(
                    select rolId from cat_rol where estadoId=1
                ) order by a.posicion;`, {
        type: QueryTypes.SELECT
    });

    const getHijos = (id) => {
        let itemsChildren = [];
        let hijos = menuUsuario.filter(i => i.menu_padreId === id);
        hijos.map(({ id, menu_padreId, posicion,url, title, icon, classes, type,visible }) => {
            itemsChildren.push({
                id,
                title,
                type,
                url,
                classes,
                icon,
                visible,
                children: getHijos(id)
            });
        });
        return itemsChildren;
    }
    let menu = [];
    menuUsuario.map(({ id, menu_padreId, posicion, url,title, icon, classes, type,visible }) => {
        if (menu_padreId === null || menu_padreId === 0) {
            menu.push({
                id,
                title,
                type,
                url,
                classes,
                icon,
                visible,
                children: getHijos(id)
            });
        }
    });




    let menuResponse = [
        {
            "id": "support",
            "title": "Navigation",
            "type": "group",
            "icon": "icon-support",
            "children": menu
        }
    ];

    return menuResponse;
}

const getImagen=async(usuarioId)=>{
    return await FotoUsuario.findOne({
        where: {usuarioId,estadoId:[1]},
        order: [
            ['foto_usuarioId', 'DESC']
        ],
        attributes: ['foto_usuarioId','foto','mimetype']
    });
}


const listPerfiles=async(usuarioId)=>{
    return await Rol.findAll({
        where: sequelize.literal(`rolId in (select rolId from usuario_rol where usuarioId=${usuarioId} and estadoId=1) and estadoId=1;`),
        attributes: ['rolId', 'nombre', 'descripcion']
    });
}

const userInfo = async (req) => {
    let { usuarioId, user_name, personaId, forzar_cambio_password, dias_cambio_password, fecha_cambio_password,fecha_crea } = req.user;
    const persona = await Persona.findOne({ where: { personaId } });
    let diasUpdatePass = 0;
    if (forzar_cambio_password === false && dias_cambio_password > 0) {
        diasUpdatePass = moment.duration(moment(fecha_cambio_password).diff(moment(new Date()))).asDays();
        diasUpdatePass = Math.round(diasUpdatePass);
        if (diasUpdatePass <= 0) {
            forzar_cambio_password = true;
        }
    }
    const { nombre1,
        nombre2,
        nombre_otros,
        apellido1,
        apellido2,
        apellido_casada,
        fecha_nacimiento,
        generoId,
        email } = persona;
    let nombre = nombre1;
    if (nombre2 && nombre2 !== "") {
        if (String(nombre2).trim().length > 0) {
            nombre += " " + nombre2;
        }
    }
    if (nombre_otros && nombre_otros !== "") {
        if (String(nombre_otros).trim().length > 0) {
            nombre += " " + nombre_otros;
        }
    }
    nombre += " " + apellido1;

    if (apellido2 && apellido2 !== "") {
        if (String(apellido2).trim().length > 0) {
            nombre += " " + apellido2;
        }
    }
    if (apellido_casada && apellido_casada !== "") {
        if (String(apellido_casada).trim().length > 0) {
            nombre += " " + apellido_casada;
        }
    }
    const userInfo = {
        usuarioId,
        user_name,
        personaId,
        forzar_cambio_password,
        fecha_crea,
        nombre,
        fecha_nacimiento,
        generoId,
        email,
        dias_cambio_password,
        fecha_cambio_password,
        diasUpdatePass,
        perfiles:await listPerfiles(usuarioId),
        imagen:await getImagen(usuarioId)
    }

    let dataUsuario = {};
    dataUsuario.userInfo = userInfo;
    dataUsuario.accesos=await listAccesos(usuarioId);
    dataUsuario.menu=await listmenu(usuarioId);
    response.code = 1;
    response.data = dataUsuario;
    return response;
}

const eliminar = async (req) => {
    let autorizado = await validarpermiso(req, MenuId, 4);
    if (autorizado !== true) {
        return autorizado;
    }
    let usuarioId = req.params.id;
    const dataAnterior = await Modelo.findOne({
        where: { usuarioId }
    });

    const dataEliminar = {
        estadoId: 3
    };
    if (dataAnterior) {
        const resultado = await Modelo.update(dataEliminar, {
            where: {
                usuarioId
            }
        });
        if (resultado > 0) {
            let { usuarioId: usuarioIdReq } = req.user;
            dataEliminar.usuario_ult_mod = usuarioIdReq;
            await registrarBitacora(tabla, usuarioId, dataAnterior.dataValues, dataEliminar);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod: usuarioIdReq
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    usuarioId
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
    const { usuarioId } = req.body;
    const dataAnterior = await Modelo.findOne({
        where: { usuarioId }
    });


    if (dataAnterior) {
        delete req.body.user_name;
        const password = req.body.password;
        if (password) {
            req.body.password = bcrypt.hashSync(password, 10);
        }
        const resultado = await Modelo.update(req.body, {
            where: {
                usuarioId
            }
        });
        if (resultado > 0) {
            let { usuarioId: usuarioIdReq } = req.user;
            req.body.usuario_ult_mod = usuarioIdReq;
            await registrarBitacora(tabla, usuarioId, dataAnterior.dataValues, req.body);
            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod: usuarioIdReq
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    usuarioId
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

const actualizarPassword = async (req) => {
    let autorizado = await validarpermiso(req, MenuId, 2);
    if (autorizado !== true) {
        return autorizado;
    }
    const { usuarioId } = req.user;
    const dataAnterior = await Modelo.findOne({
        where: { usuarioId },
        attributes:['password','forzar_cambio_password','fecha_cambio_password']
    });

    if (dataAnterior) {
        let dataUpdate = {};
        let { usuarioId, dias_cambio_password } = req.user;
        const user = await Usuario.findOne({ where: { usuarioId, estadoId: 1 } });
        if (!user) {
            response.code = -1;
            response.data = "Credenciales inválidas";
            return response;
        } else {
            const { password_actual, password_nuevo } = req.body;
            if (password_actual !== password_nuevo) {

                return bcrypt.compare(password_actual, user.password)
                    .then(async (sonIguales) => {
                        if (sonIguales === true) {
                            dataUpdate.password = bcrypt.hashSync(password_nuevo, 10);
                            dataUpdate.forzar_cambio_password = false;
                            dataUpdate.fecha_cambio_password = moment(new Date(), 'YYYY/MM/DD HH:mm').add(dias_cambio_password,"days");
                            const resultado = await Modelo.update(dataUpdate, {
                                where: {
                                    usuarioId
                                }
                            });
                            if (resultado > 0) {
                                dataUpdate.usuario_ult_mod = usuarioId;
                                await registrarBitacora(tabla, usuarioId, dataAnterior.dataValues, dataUpdate);
                                //Actualizar fecha de ultima modificacion
                                let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
                                const data = {
                                    fecha_ult_mod,
                                    usuario_ult_mod: usuarioId
                                }
                                const resultadoUpdateFecha = await Modelo.update(data, {
                                    where: {
                                        usuarioId
                                    }
                                });

                                response.code = 1;
                                response.data = "Contraseña actualizada exitosamente";
                                return response;
                            } else {
                                response.code = 0;
                                response.data = "No existen cambios para aplicar";
                                return response;
                            }

                        }
                        else {
                            response.code = -1;
                            response.data = 'Credenciales inválidas';
                            return response;
                        }
                    })
                    .catch((error) => {
                        response.code = -1;
                        response.data = "No fue posible realizar la actualización de contraseña " + error;
                        return response;
                    });

            } else {
                response.code = 0;
                response.data = "La contraseña actual y la nueva son iguales, por favor verifique";
                return response;
            }
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
    update,
    eliminar,
    actualizarPassword,
    userInfo
}