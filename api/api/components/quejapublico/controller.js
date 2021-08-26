const fs = require("fs");
const moment = require('moment');
var { Op } = require('sequelize');
const { v4 } = require("uuid");
const { Queja, Sucursal, SedeDiaco, Comercio, Municipio, Departamento, Parametro, Media } = require('../../../store/db');
const Correo = require('../../../utils/EnviarCorreo');
let { html } = require('../../../utils/plantillasCorreo/RegistroQueja');
var sequelize = require("sequelize");
const pathArchivo = __dirname + "/../../../public/adjunto/";

const urlArchivos = pathArchivo;
const insert = async (req) => {
    let transaction;
    let response = {};
    let { datos } = req.body;
    let infoRequest = JSON.parse(datos);
    let files = req.files || [];
    let adjuntos = [];
    try {
        transaction = await Queja.sequelize.transaction();
        let {
            sede_diacoId = 1,
            sucursalId,
            num_documento = '',
            fecha_documento = undefined,
            descripcion = '',
            solicitud = ''
        } = infoRequest;

        if (String(fecha_documento).trim().length < 8) {
            fecha_documento = undefined;
        }

        let textoMinimoDescripcion = 1;
        let textoMinimoSolicitud = 1;
        const sedeDiaco = await SedeDiaco.findOne({ where: { sede_diacoId }, transaction });
        if (sedeDiaco) {
            const sucursalNombre = await Sucursal.findOne({ where: { sucursalId }, transaction });
            if (sucursalNombre) {
                if (num_documento) {
                    if (!fecha_documento) {
                        response.code = 0;
                        response.data = `Por favor ingrese la fecha del documento`;
                        return response;
                    }
                }
                if (fecha_documento) {
                    fecha_documento = moment(fecha_documento).format('YYYY/MM/DD');
                    if (!num_documento) {
                        response.code = 0;
                        response.data = `Por favor ingrese el número del documento`;
                        return response;
                    }
                }
                if (String(descripcion).trim().length < textoMinimoDescripcion) {
                    response.code = 0;
                    response.data = `La descripción debe de contener por los menos ${textoMinimoDescripcion} carácteres`;
                    return response;
                }
                if (String(solicitud).trim().length < textoMinimoSolicitud) {
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
                }, { transaction });

                let { quejaId } = result;
                if (Number(quejaId) > 0) {
                    if (files.length > 0) {
                        let totalItems = files.length;
                        let contador = 0;
                        for await (let img of files) {
                            const { buffer, size, originalname, mimetype } = img;
                            let uuidItem = v4();
                            let extension = String(img.mimetype).split('/')[1];
                            let rutaGuardar = `${pathArchivo}${uuidItem}.${extension}`;
                            let urlItem = `${urlArchivos}${uuidItem}.${extension}`;
                            fs.createWriteStream(rutaGuardar).write(img.buffer);

                            adjuntos.push({
                                path: urlItem,
                                nombre: `Adjunto No. ${contador}`,
                                mimetype
                            });

                            let datosMedia = {
                                quejaId,
                                mimetype,
                                blob: buffer
                            }
                            let resultMedia = await Media.create(datosMedia, { transaction });
                            let { mediaId = 0 } = resultMedia;
                            if (mediaId <= 0) {
                                await transaction.rollback();
                                response.code = -1;
                                response.data = `Ocurrió un error al intentar registrar la queja, por favor llame al Call Center`;
                                return response;
                            }
                            contador++;
                        }
                        if (totalItems !== contador) {
                            await transaction.rollback();
                            response.code = -1;
                            response.data = `Ocurrió un error al enviar los archivos adjuntos, por favor llame a Call Center`;
                            return response;
                        }

                    }
                    await transaction.commit();
                    EnviarCorreo(sucursalNombre, result, adjuntos);
                    response.code = 1;
                    response.data ="Queja registrada exitosamente";
                    return response;
                } else {
                    response.code = 0;
                    response.data = `Ocurrió un error al intentar registrar la queja, por favor llame al Call Center`;
                    return response;
                }

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
    } catch (error) {
        await transaction.rollback();
        throw new Error(error);
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
const EnviarCorreo = async (sucursal, queja, adjuntos = []) => {
    const { comercioId, nombre, direccion, correo: correoSucursal, municipioId } = sucursal;
    const { razon_social, nit, correo } = await Comercio.findOne({ where: { comercioId } });
    const { num_documento, fecha_documento, descripcion, solicitud, fecha_crea } = queja;
    let query = {};
    query.municipioId = municipioId;
    const infoMunicipio = await Municipio.findOne({
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
    let { descripcion: nombreMunicipio, Departamento: { descripcion: nombreDepto } } = infoMunicipio;
    const htmlContenido = `<table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%" role="presentation"> 
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
    html = html.replace("{contenidoQueja}", htmlContenido);
    const configuracion = await getConfiguracionEmail();
    configuracion.adjuntos = adjuntos || [];
    configuracion.cc = correo;
    const resultEmail = await Correo.sendMail(configuracion, correoSucursal, "Registro de Queja", null, html);
}
const getComerciosMunicipio = async (req) => {
    let response = {};
    let { municipioId } = req.query;
    if (municipioId) {
        let items = await Comercio.findAll({
            attributes: ['comercioId', 'nombre', 'razon_social'],
            where: sequelize.literal(`cat_comercio.comercioId in (select comercioId from cat_sucursal where cat_sucursal.municipioId=${municipioId} and cat_sucursal.estadoId=1) and cat_comercio.estadoId=1`),
        });
        response.code = 1;
        response.data = items;
        return response;
    } else {
        response.code = 0;
        response.data = `Debe de seleccionar el municipio en donde esta el comercio al cual quiere agregar una queja`;
        return response;
    }
}
module.exports = {
    insert,
    getComerciosMunicipio
}