const moment = require('moment');
const bcrypt = require('bcrypt');
const { v4 } = require("uuid");
const Correo = require('../../../utils/EnviarCorreo');
const { ResetPassWord, Parametro, Persona, Usuario } = require('../../../store/db');
let { htmlResetPassword } = require('../../../utils/plantillasCorreo/ResetPassword');

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
    const { valor: minutosVigenciaEnlace } = parametros.find(item => item.nombreVariable === "minutosVigenciaEnlace");
    const config = {};
    config.host = host;
    config.port = Number(port);
    config.secure = Boolean(secure);
    config.user = user;
    config.pass = pass;
    config.minutosVigenciaEnlace = minutosVigenciaEnlace;
    return config;
}

const getInfoCorreo = async () => {
    const parametros = await Parametro.findAll(
        {
            where: { 'nombreGrupo': 'CONFIG_EMPRESA', estadoId: [1] },
            attributes: ['tipoDato', 'nombreVariable', 'valor']
        });
    const { valor: nombreEmpresa } = parametros.find(item => item.nombreVariable === "nombreEmpresa");
    const { valor: direccionEmpresa } = parametros.find(item => item.nombreVariable === "direccionEmpresa");
    const { valor: urlLogoEmpresa } = parametros.find(item => item.nombreVariable === "urlLogoEmpresa");
    const { valor: urlWebResetPassWord } = parametros.find(item => item.nombreVariable === "urlWebResetPassWord");
    const config = {};
    config.nombreEmpresa = nombreEmpresa;
    config.direccionEmpresa = direccionEmpresa;
    config.urlLogoEmpresa = urlLogoEmpresa;
    config.urlWebResetPassWord = urlWebResetPassWord;
    return config;
}

const enviarCorreo = async (req) => {
    let response = {};
    const { email } = req.body;
    const persona = await Persona.findOne({ where: { email }, attributes: ['personaId'] });
    let ipCliente = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const { personaId } = !!persona && persona;
    if (personaId > 0) {
        const usuario = await Usuario.findOne({ where: { personaId }, attributes: ['usuarioId', 'user_name'] });
        const { usuarioId = 0, user_name } = !!usuario && usuario;
        if (usuarioId > 0) {
            let solicitudExistente = false;
            let infoResetPass = await ResetPassWord.findOne({
                where: { usuarioId, estadoId: [1] },
                attributes: ['codigo', 'messageId', 'fecha_vencimiento', 'estadoId'],
                order: [
                    ['codigo', 'DESC']
                ]
            });
            if (infoResetPass) {
                const { fecha_vencimiento } = infoResetPass;
                let minutosParaVencer = moment.duration(moment(fecha_vencimiento).diff(moment(new Date()))).asMinutes();
                if (minutosParaVencer > 0) {
                    solicitudExistente = true;
                }
            }
            if (!solicitudExistente) {
                const configuracion = await getConfiguracionEmail();
                const infoCorreo = await getInfoCorreo();
                const { minutosVigenciaEnlace = 10 } = !!configuracion && configuracion;
                const { nombreEmpresa = "NO CONFIGURADO", direccionEmpresa = "NO CONFIGURADO", urlLogoEmpresa = "#", urlWebResetPassWord = "#" } = !!infoCorreo && infoCorreo;
                let uuidReset = v4();
                const infoReset = {
                    codigo: uuidReset,
                    emisor:configuracion.user,
                    receptor: email,
                    ipSolicitud: ipCliente
                };
                infoReset.usuarioId = usuarioId;
                infoReset.fecha_vencimiento = moment(new Date(), 'YYYY/MM/DD HH:mm').add(minutosVigenciaEnlace, "minutes");
                const data = await ResetPassWord.create(infoReset);
                const { codigo } = !!data && data;
                let htmlAux = htmlResetPassword;
                htmlAux = htmlAux.replace("[urlLogoEmpresa]", urlLogoEmpresa);
                htmlAux = htmlAux.replace("[tituloCorreo]", "Restablecer Contraseña");
                htmlAux = htmlAux.replace("[descripcionCorta]", "Toque el botón de abajo para restablecer la contraseña de su cuenta. Si no solicitó una nueva contraseña, puede eliminar este correo de forma segura.");
                htmlAux = htmlAux.replace("[contenidoCorreo]", "Toque el botón de abajo para restablecer la contraseña de su cuenta. Si no solicitó una nueva contraseña, puede eliminar este correo de forma segura.");
                htmlAux = htmlAux.replace("[tituloBoton]", "Restablecer");
                htmlAux = htmlAux.replace("[informacionExtra]", `El enlace para restablecer la contraseña vence en <b>${minutosVigenciaEnlace}</b> minutos.`);
                htmlAux = htmlAux.replace("[footer]", "Recibió este correo electrónico porque recibimos una solicitud de <b>Restablecer Contraseña</b> para su cuenta. Si no solicitó <b>Restablecer Contraseña</b>, puede eliminar este correo de forma segura.");
                htmlAux = htmlAux.replace("[nombreEmpresa]", nombreEmpresa);
                htmlAux = htmlAux.replace("[direccionEmpresa]", direccionEmpresa);
                let hrefBoton = `${urlWebResetPassWord}${codigo}`;
                htmlAux = htmlAux.replace("[hrefBoton]", hrefBoton);
                const resultEmail = await Correo.sendMail(configuracion, email, "Restablecer Contraseña", null, htmlAux);
                let messageId = resultEmail.messageId;
                messageId = messageId.replace("<", "").replace(">", "");
                const resultadoUpdateResetPass = await ResetPassWord.update({ messageId, estadoId: 1 }, {
                    where: {
                        codigo
                    }
                });
                response.code = 1;
                response.data = "Se ha enviado un enlace a su correo electrónico, por revise su bandeja de entrada.";
            } else {
                response.code = 0;
                response.data = "Ya existe una solicitud para restablecer su contraseña, por favor revise su correo electrónico.";
            }
        } else {
            response.code = -1;
            response.data = "La persona no tiene asignado un usuario.";
        }
    } else {
        response.code = -1;
        response.data = "El correo electrónico enviado no existe en la base de datos.";
    }
    return response;
}

const updatePass = async (req) => {
    let ipCliente = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let response = {};
    const { id, password = "" } = req.body;
    if (String(password).trim().length > 0) {
        if (id) {
            let uuidReset = String(id).trim();
            let infoResetPass = await ResetPassWord.findOne({
                where: { codigo: uuidReset },
                attributes: ['codigo', 'usuarioId', 'messageId', 'fecha_vencimiento', 'estadoId'],
                order: [
                    ['codigo', 'DESC']
                ]
            });
            if (infoResetPass) {
                const { fecha_vencimiento, estadoId, usuarioId } = infoResetPass;
                if (estadoId === 1) {
                    let minutosParaVencer = moment.duration(moment(fecha_vencimiento).diff(moment(new Date()))).asMinutes();
                    if (minutosParaVencer > 0) {
                        let encript_pass = bcrypt.hashSync(password, 10);
                        const resultadoUpdateUser = await Usuario.update({ password: encript_pass }, {
                            where: {
                                usuarioId
                            }
                        });
                        if (resultadoUpdateUser > 0) {
                            const resultadoUpdateResetPass = await ResetPassWord.update({ ipUpdate: ipCliente, fecha_update: new Date(), estadoId: 2  }, {
                                where: {
                                    codigo: uuidReset
                                }
                            });
                            response.code = 1;
                            response.data = "Contraseña actualizada exitosamente.";
                        } else {
                            response.code = -1;
                            response.data = "Ocurrió un error al intentar actualizar la contraseña, por favor comuniquese con el administrador de la aplicación.";
                        }
                    } else {
                        response.code = -1;
                        response.data = "La solicitud para restablecer contraseña ya venció.";
                    }
                } else {
                    response.code = -1;
                    response.data = "La solicitud para restablecer contraseña ya fue utilizada.";
                }
            } else {
                response.code = -1;
                response.data = "No existe solicitud para restablecer contraseña.";
            }
        } else {
            response.code = -1;
            response.data = "Los parametros enviados no son válidos.";
        }
    } else {
        response.code = -1;
        response.data = "La contraseña enviado no es válida.";
    }

    return response;
}

module.exports = {
    enviarCorreo,
    updatePass
}