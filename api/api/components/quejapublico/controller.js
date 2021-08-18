const moment = require('moment');
var { Op } = require('sequelize');
const { Queja, Sucursal, SedeDiaco, Comercio, Municipio, Departamento, Parametro } = require('../../../store/db');
const Correo = require('../../../utils/EnviarCorreo');
let { html } = require('../../../utils/plantillasCorreo/RegistroQueja');

const insert = async (req) => {
    let response = {};
    let {
        sede_diacoId,
        sucursalId,
        num_documento = '',
        fecha_documento = undefined,
        descripcion = '',
        solicitud = ''
    } = req.body;
    let textoMinimoDescripcion=1;
    let textoMinimoSolicitud=1;
    const sedeDiaco = await SedeDiaco.findOne({ where: { sede_diacoId } });
    if (sedeDiaco) {
        const sucursalNombre = await Sucursal.findOne({ where: { sucursalId }});
        if (sucursalNombre) {
            if (num_documento) {
                if (!fecha_documento) {
                    response.code = 0;
                    response.data = `Por favor ingrese la fecha del documento`;
                    return response;
                }
            }
            if (fecha_documento) {
                fecha_documento=moment(fecha_documento).format('YYYY/MM/DD');
                if (!num_documento) {
                    response.code = 0;
                    response.data = `Por favor ingrese el número del documento`;
                    return response;
                }
            }
            if(String(descripcion).trim().length<textoMinimoDescripcion){
                response.code = 0;
                response.data = `La descripción debe de contener por los menos ${textoMinimoDescripcion} carácteres`;
                return response;
            }
            if(String(solicitud).trim().length<textoMinimoSolicitud){
                response.code = 0;
                response.data = `La solicitud debe de contener por los menos ${textoMinimoSolicitud} carácteres`;
                return response;
            }

            const result = await Queja.create({
                sede_diacoId,
                sucursalId,
                num_documento,
                fecha_documento,
                descripcion,
                solicitud,
                estado_quejaId: 1
            });
            EnviarCorreo(sucursalNombre,result);
            response.code = 1;
            response.data = result;
            return response;
        } else {
            response.code = 0;
            response.data = `La Sucursal del comercio seleccionado no existe`;
            return response;
        }

    } else {
        response.code = 0;
        response.data = `La sede de la DIACO enviada no existe`;
        return response;
    }
}
const getConfiguracionEmail = async () => {
    const parametros = await Parametro.findAll(
        {
            where: { 'nombreGrupo': 'CONFIG_EMISOR', estadoId: [1] },
            attributes: ['tipoDato', 'nombreVariable', 'valor']
        });
    const { valor: host } = parametros.find(item => item.nombreVariable === "hostEmailEmisor");
    const { valor: port } = parametros.find(item => item.nombreVariable === "portHostEmisor");
    const { valor: secure } = parametros.find(item => item.nombreVariable === "secureHostEmisor");
    const { valor: user } = parametros.find(item => item.nombreVariable === "emailEmisor");
    const { valor: pass } = parametros.find(item => item.nombreVariable === "passwordEmisor");
    const config = {};
    config.host = host;
    config.port = Number(port);
    config.secure = Boolean(secure);
    config.user = user;
    config.pass = pass;
    return config;
}
const EnviarCorreo=async(sucursal,queja)=>{
    const{comercioId,nombre,direccion,correo:correoSucursal,municipioId}=sucursal;
    const{razon_social,nit,correo}=await Comercio.findOne(  {where: { comercioId }});
    const{num_documento,fecha_documento,descripcion,solicitud,fecha_crea}=queja;
    let query={};
    query.municipioId=municipioId;
    const infoMunicipio=await Municipio.findOne({
        include: [
        {
            model: Departamento,
            as: "Departamento",
            required: true,
            attributes: ['descripcion']
        }],
        where: [query],
        order: [
            ['municipioId', 'ASC']
        ]
    });
    let {descripcion:nombreMunicipio,Departamento:{descripcion:nombreDepto}}=infoMunicipio;
    const htmlContenido=`<table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%" role="presentation"> 
    <tr> 
     <td style="padding:0;Margin:0">Comercio</td> 
     <td style="padding:0;Margin:0">${razon_social}</td> 
    </tr> 
    <tr> 
     <td style="padding:0;Margin:0">Sucursal</td> 
     <td style="padding:0;Margin:0">${nombre}</td> 
    </tr> 
    <tr> 
     <td style="padding:0;Margin:0">Departamento</td> 
     <td style="padding:0;Margin:0">${nombreDepto}</td> 
    </tr> 
    <tr> 
     <td style="padding:0;Margin:0">Municipio</td> 
     <td style="padding:0;Margin:0">${nombreMunicipio}</td> 
    </tr> 
    <tr> 
     <td style="padding:0;Margin:0">Dirección</td> 
     <td style="padding:0;Margin:0">${direccion}</td> 
    </tr> 
    <tr> 
     <td style="padding:0;Margin:0">Número Documento</td> 
     <td style="padding:0;Margin:0">${num_documento}</td> 
    </tr> 
    <tr> 
     <td style="padding:0;Margin:0">Fecha</td> 
     <td style="padding:0;Margin:0">${fecha_documento}</td> 
    </tr> 
    <tr> 
     <td style="padding:0;Margin:0">Descripción</td> 
     <td style="padding:0;Margin:0">${descripcion}</td> 
    </tr> 
    <tr> 
     <td style="padding:0;Margin:0">Solicitud</td> 
     <td style="padding:0;Margin:0">${descripcion}</td> 
    </tr> 
    <tr> 
     <td style="padding:0;Margin:0">Fecha Registro</td> 
     <td style="padding:0;Margin:0">${fecha_crea}</td> 
    </tr> 
    <tr> 
     <td style="padding:0;Margin:0">Estado</td> 
     <td style="padding:0;Margin:0">CREADA</td> 
    </tr> 
  </table>`;
    html=html.replace("{contenidoQueja}", htmlContenido);
    const configuracion = await getConfiguracionEmail();
    const resultEmail = await Correo.sendMail(configuracion, correo, "Registro de Queja", null, html);
    const resultEmail2 = await Correo.sendMail(configuracion, correoSucursal, "Registro de Queja", null, html);
}
module.exports = {
    insert
}