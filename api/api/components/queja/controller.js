var sequelize = require("sequelize");
const moment = require('moment');
const { Queja, Municipio, EstadoQueja, Departamento, Sucursal, Comercio, bd, Media, Usuario } = require('../../../store/db');
const { registrarBitacora } = require('../../../utils/bitacora_cambios');
const { validarpermiso } = require('../../../auth');
const MenuId = 36;
const Modelo = Queja;
const tabla = 'queja';
const { QueryTypes } = require('sequelize');

const list = async (req) => {
    let response = {};
    let autorizado = await validarpermiso(req, MenuId, 3);
    if (autorizado !== true) {
        return autorizado;
    }
    let { usuarioId } = req.user;
    let auxWhereDepto = '';
    let { tipoBusqueda = 0, regionId = 0, departamentoId = 0,estado_quejaId=0, municipioId = 0, comercioId = 0, sucursalId = 0, fechaInicial = undefined, fechaFinal = undefined } = req.body;
    let where = "";
    if (Number(tipoBusqueda) === 0) {
        if (departamentoId > 0) {
            where = ' and mun.departamentoId=' + departamentoId;
        }
    }

    if (Number(tipoBusqueda) === 1) {
        if (regionId > 0) {
            where += ` and reg.regionId=${regionId}`;
        }
        if (departamentoId > 0) {
            where += ` and mun.departamentoId=${departamentoId}`;
        }
        if (municipioId > 0) {
            where += ` and mun.municipioId=${municipioId}`
        }
        if (sucursalId > 0) {
            where += ` and suc.sucursalId=${sucursalId}`
        }
        if (comercioId > 0) {
            where += ` and com.comercioId=${comercioId}`
        }
        if(Number(estado_quejaId)>0){
            where += ` and queja.estado_quejaId=${estado_quejaId}`
        }
        if (String(fechaInicial).trim().length == 10) {
            if (String(fechaFinal).trim().length == 10) {
                fechaFinal = moment(fechaFinal, 'YYYY-MM-DD').add(1, "days").format('YYYY-MM-DD');
                where += ` and queja.fecha_crea between '${fechaInicial}' and '${fechaFinal}'`
            }
        }
    }


    const pagina = req.query.pagina ? parseInt(req.query.pagina) : 0;
    const limite = req.query.limite ? parseInt(req.query.limite) : 10;
    const regMin = pagina * limite;

    let total = await bd.query(`
select count(*) count from queja queja 
inner join cat_sucursal suc
on queja.sucursalId=suc.sucursalId
inner join cat_comercio com
on suc.comercioId=com.comercioId
inner join cat_municipio mun
on suc.municipioId=mun.municipioId
inner join cat_departamento depto
on mun.departamentoId=depto.departamentoId
inner join cat_region reg
on depto.regionId=reg.regionId
where suc.estadoId=1 and com.estadoId=1 and mun.estadoId=1 and reg.estadoId=1 and depto.estadoId=1
and depto.departamentoId in(
	select municipio.departamentoId from cat_sede_diaco sede
	inner join cat_municipio municipio
	on sede.municipioId=municipio.municipioId
	where sede.estadoId=1 and municipio.estadoId=1 and
		sede.sede_diacoId in(
		select sede_diacoId from usuario_sede_diaco where usuarioId=${usuarioId} and estadoId=1
		)
) ${where};
   `, {
        type: sequelize.QueryTypes.SELECT
    });

    let data = await bd.query(`
    select queja.*,
	com.comercioId,
    com.razon_social,
    suc.sucursalId,
    suc.nombre as sucursal,
    reg.descripcion as region,
    depto.descripcion as departamento,
    mun.descripcion as municipio from queja queja 
inner join cat_sucursal suc
on queja.sucursalId=suc.sucursalId
inner join cat_comercio com
on suc.comercioId=com.comercioId
inner join cat_municipio mun
on suc.municipioId=mun.municipioId
inner join cat_departamento depto
on mun.departamentoId=depto.departamentoId
inner join cat_region reg
on depto.regionId=reg.regionId
where suc.estadoId=1 and com.estadoId=1 and mun.estadoId=1 and reg.estadoId=1 and depto.estadoId=1
and depto.departamentoId in(
	select municipio.departamentoId from cat_sede_diaco sede
	inner join cat_municipio municipio
	on sede.municipioId=municipio.municipioId
	where sede.estadoId=1 and municipio.estadoId=1 and
		sede.sede_diacoId in(
		select sede_diacoId from usuario_sede_diaco where usuarioId=${usuarioId} and estadoId=1
		)
)
${where}
order by 1 asc
limit ${regMin},${limite};
   `, {
        type: sequelize.QueryTypes.SELECT
    });

    let salida = {};
    salida.count = total[0].count;
    salida.rows = data;
    response.code = 1;
    response.data = salida;
    return response;

}

list2 = async (req) => {
    let response = {};
    // let autorizado = await validarpermiso(req, MenuId, 3);
    // if (autorizado !== true) {
    //     return autorizado;
    // }
    let { usuarioId } = req.user;
    let auxWhereDepto = '';
    const { tipoBusqueda = 0, deptoId = 0, regionId = 0, departamentoId = 0, municipioId = 0, comercioId = 0, sucursalId = 0, fechaInicial = undefined, fechaFinal = undefined } = req.query;

    if (Number(tipoBusqueda) === 0) {
        if (deptoId > 0) {
            auxWhereDepto = ' and auxMunicipio.departamentoId=' + deptoId;
        }
    }

    let auxWhereDeptoRegionMunicipio = "";
    if (Number(tipoBusqueda) === 1) {
        console.log("BUSQUEDA1");
        if (departamentoId > 0) {
            auxWhereDeptoRegionMunicipio += ` and departamentoId=${departamentoId}`;
        }
        if (municipioId > 0) {
            auxWhereDeptoRegionMunicipio += ` and auxMunicipio.municipioId=${municipioId}`
        }
    }
    const pagina = req.query.pagina ? parseInt(req.query.pagina) : 0;
    const limite = req.query.limite ? parseInt(req.query.limite) : 10;

    console.log(req.query);
    console.log(auxWhereDeptoRegionMunicipio);
    let data = await Queja.findAndCountAll({
        offset: pagina * limite,
        limit: limite,
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
                    ) and auxSede.estadoId=1 and auxMunicipio.estadoId=1 ${auxWhereDepto} ${auxWhereDeptoRegionMunicipio}
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

const GetMisRegiones = async (usuarioId) => {
    return await bd.query(`
    select regionId as value,descripcion as label from cat_region where regionId in(
        select regionId from cat_departamento where departamentoId in(
            select departamentoId from cat_sede_diaco a
            inner join cat_municipio b
            on a.municipioId=b.municipioId and b.estadoId=1 and a.estadoId=1
            inner join usuario_sede_diaco c
            on a.sede_diacoId=c.sede_diacoId and c.estadoId=1
            where c.usuarioId=${usuarioId}
        ) and estadoId=1
    ) and estadoId=1 order by 1;
   `, {
        type: sequelize.QueryTypes.SELECT
    });
}

const GetMisDeptos = async (usuarioId, regionId) => {
    return await bd.query(`
    select departamentoId as value,descripcion as label from cat_departamento where departamentoId in(
		select departamentoId from cat_sede_diaco a
		inner join cat_municipio b
		on a.municipioId=b.municipioId and b.estadoId=1 and a.estadoId=1
		inner join usuario_sede_diaco c
		on a.sede_diacoId=c.sede_diacoId and c.estadoId=1
		where c.usuarioId=${usuarioId}
	) and estadoId=1 and regionId=${regionId} order by 1;

   `, {
        type: sequelize.QueryTypes.SELECT
    });
}

const GetMunicipios = async (departamentoId) => {
    return await bd.query(`
        select municipioId as value,descripcion as label from cat_municipio where departamentoId=${departamentoId} and estadoId=1 order by 2;
   `, {
        type: sequelize.QueryTypes.SELECT
    });
}

const GetComercios = async (departamentoId, municipioId = 0) => {
    let whereMunicipio = "";
    if (municipioId > 0) {
        whereMunicipio = " and b.municipioId=" + municipioId;
    }
    return await bd.query(`
    select comercioId as value,nombre as label from cat_comercio where estadoId=1 and comercioId in(
        select comercioId from cat_sucursal a
        inner join cat_municipio b
        on a.municipioId=b.municipioId
        where a.estadoId=1 and b.estadoId=1 and b.departamentoId=${departamentoId} ${whereMunicipio}
        ) order by 2;
   `, {
        type: sequelize.QueryTypes.SELECT
    });
}

const GetSucursales = async (comercioId, municipioId = 0) => {
    let whereMunicipio = "";
    if (municipioId > 0) {
        whereMunicipio = " and a.municipioId=" + municipioId;
    }

    return await bd.query(`
        select a.sucursalId as value, a.nombre as label from cat_sucursal a
        inner join cat_comercio b
        on a.comercioId=b.comercioId
        where a.estadoId=1 and b.estadoId=1 and b.comercioId=${comercioId} ${whereMunicipio} order by 2;
   `, {
        type: sequelize.QueryTypes.SELECT
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

const QuejasPorDepto = async (usuarioId) => {
    return await bd.query(`
   select a.departamentoId,a.descripcion as departamento,sum(ifnull(aux.fila,0)) as total from cat_departamento a
   left join(
   select mun.departamentoId,1 as fila from queja ax
   inner join cat_sucursal suc
   on ax.sucursalId=suc.sucursalId
   inner join cat_comercio com
   on suc.comercioId=com.comercioId
   inner join cat_municipio mun
   on suc.municipioId=mun.municipioId
   inner join cat_departamento depto
   on mun.departamentoId=depto.departamentoId
   where depto.departamentoId in(
    select b.departamentoId from cat_sede_diaco a
    inner join cat_municipio b
    on a.municipioId=b.municipioId
    inner join cat_departamento c
    on b.departamentoId=c.departamentoId
    where a.sede_diacoId in(
        select sede_diacoId from usuario_sede_diaco where usuarioId=${usuarioId} and estadoId=1
    )
   )
   ) as aux
   on a.departamentoId=aux.departamentoId
   where a.departamentoId in(
    select b.departamentoId from cat_sede_diaco a
    inner join cat_municipio b
    on a.municipioId=b.municipioId
    inner join cat_departamento c
    on b.departamentoId=c.departamentoId
    where a.sede_diacoId in(
        select sede_diacoId from usuario_sede_diaco where usuarioId=${usuarioId} and estadoId=1
    )
   )
   group by a.departamentoId,a.descripcion;
   `, {
        type: sequelize.QueryTypes.SELECT
    });
}


const listItems = async (req) => {
    let response = {};
    let autorizado = await validarpermiso(req, MenuId, 3);
    if (autorizado !== true) {
        return autorizado;
    }
    let { usuarioId } = req.user;
    let { id } = req.params;
    let { comercioId, departamentoId, regionId, municipioId = 0 } = req.query;
    switch (String(id).trim().toUpperCase()) {
        case "MISREGIONES":
            response.code = 1;
            response.data = await GetMisRegiones(usuarioId);
            return response;
        case "MISDEPTOS":
            response.code = 1;
            response.data = await GetMisDeptos(usuarioId, regionId);
            return response;
        case "MUNICIPIOS":
            response.code = 1;
            response.data = await GetMunicipios(departamentoId);
            return response;
        case "COMERS":
            response.code = 1;
            response.data = await GetComercios(departamentoId, municipioId);
            return response;
        case "SUCURS":
            response.code = 1;
            response.data = await GetSucursales(comercioId, municipioId);
            return response;
        case "QUEJASDEPTO":
            response.code = 1;
            response.data = await QuejasPorDepto(usuarioId);
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
        let dataNueva={
            estado_quejaId:5,
            solucion:req.body.solucion ?? "",
            observaciones:req.body.observaciones ?? ""
        }

        const resultado = await Modelo.update(dataNueva, {
            where: {
                quejaId
            }
        });
        if (resultado > 0) {
            let { usuarioId } = req.user;
            req.body.usuario_ult_mod = usuarioId;
            await registrarBitacora(tabla, quejaId, dataAnterior.dataValues,dataNueva);

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

const listInfo=async(req)=>{
    let response={};
    let {id}=req.params;
    response.code=1;
    response.data=await Queja.findOne({
        include: [
            {
                model: Media,
                as: "Media",
                required: false,
                attributes: ['mediaId', 'mimetype','blob','fecha_crea'],
                where: { estadoId: 1 }
            },
            {
                model: Usuario,
                as: "Usuario",
                required: false,
                attributes: ['usuarioId','user_name'],
                where: { estadoId: 1 }
            }
        ],
        where: { quejaId:id}
    });
    return response;
}
module.exports = {
    list,
    update,
    listItems,
    listInfo
}