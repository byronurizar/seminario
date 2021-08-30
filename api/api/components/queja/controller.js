var sequelize = require("sequelize");
const moment = require('moment');
const { Queja, Municipio, EstadoQueja, Departamento, Sucursal, Comercio } = require('../../../store/db');
const { registrarBitacora } = require('../../../utils/bitacora_cambios');
const { validarpermiso } = require('../../../auth');
const MenuId = 18;
const Modelo = Queja;
const tabla = 'queja';

list = async (req) => {
    let response = {};
    let autorizado = await validarpermiso(req, MenuId, 3);
    if (autorizado !== true) {
        return autorizado;
    }
    let { usuarioId } = req.user;
    let data = await Queja.findAll({
        include: [{
            model: Sucursal,
            as: "Sucursal",
            required: true,
            attributes: ['comercioId', 'nombre'],
            where: { estadoId: 1 },
            include: [{
                model: Comercio,
                as: "Comercio",
                required: true,
                attributes: ['razon_social'],
            },
            {
                model: Municipio,
                as: "Municipio",
                required: true,
                attributes: ['descripcion'],
                where: { estadoId: 1 },
                include: [{
                    model: Departamento,
                    as: "Departamento",
                    required: true,
                    attributes: ['descripcion'],
                    where: { estadoId: 1 },
                }],
                where: sequelize.literal(`departamentoId in(
                    select auxMunicipio.departamentoId from cat_sede_diaco auxSede 
                    inner join cat_municipio auxMunicipio 
                    on auxSede.municipioId=auxMunicipio.municipioId
                    where auxSede.sede_diacoId in(
                    select sede_diacoId from usuario_sede_diaco where usuarioId=${usuarioId} and estadoId=1
                    ) and auxSede.estadoId=1 and auxMunicipio.estadoId=1
                    )`)
            }
            ]
        }
        ],

        order: [
            ['fecha_crea', 'ASC']
        ]
    });
    response.code = 1;
    response.data = data;
    return response;
}
const listDepartamentos = async (usuarioId) => {
    return await Departamento.findAll({
        attributes: ['departamentoId', 'descripcion'],
        where: sequelize.literal(`departamentoId in(
            select departamentoId from cat_sede_diaco a
            inner join cat_municipio b
            on a.municipioId=b.municipioId and b.estadoId=1 and a.estadoId=1
            inner join usuario_sede_diaco c
            on a.sede_diacoId=c.sede_diacoId and c.estadoId=1
            where c.usuarioId=${usuarioId}
            ) and estadoId=1`)
    });
}

const listComerciosDepto = async (departamentoId) => {
    return await Comercio.findAll({
        attributes: ['comercioId', 'nombre'],
        where: sequelize.literal(`comercioId in(
            select comercioId from cat_sucursal a
            inner join cat_municipio b
            on a.municipioId=b.municipioId and a.estadoId=1 and b.estadoId=1
            where b.departamentoId=${departamentoId}
        )`)
    });
}

const listSucursales = async (comercioId) => {
    return await Sucursal.findAll({
        include: [
            {
                model: Municipio,
                as: "Municipio",
                required: true,
                attributes: ['descripcion'],
                where: { estadoId: 1 }
            }
        ],
        attributes: ['sucursalId', 'nombre'],
        where: { comercioId, estadoId: 1 }
    });
}



const listCombos = async (req) => {
    let response = {};
    let autorizado = await validarpermiso(req, MenuId, 3);
    if (autorizado !== true) {
        return autorizado;
    }
    let { usuarioId } = req.user;
    let { id } = req.params;
    let { dId, cId } = req.query;
    switch (String(id).trim().toUpperCase()) {
        case "DEPTOS":
            response.code = 1;
            response.data = await listDepartamentos(usuarioId);
            return response;
        case "COMERS":
            response.code = 1;
            response.data = await listComerciosDepto(dId);
            return response;
        case "SUCURS":
            response.code = 1;
            response.data = await listSucursales(cId);
            return response;
        default:
            response.code = 0;
            response.data = "Opción inválida";
            return response;
    }
}
const update = async (req) => {
    let response = {};
    let autorizado = await validarpermiso(req, MenuId, 2);
    if (autorizado !== true) {
        return autorizado;
    }
    const { quejaId } = req.body;
    const dataAnterior = await Modelo.findOne({
        where: { quejaId }
    });


    if (dataAnterior) {
        const resultado = await Modelo.update(req.body, {
            where: {
                quejaId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            req.body.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, quejaId, dataAnterior.dataValues, req.body);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod,
                usuario_ult_mod: usuarioId
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    quejaId
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
    listCombos
}