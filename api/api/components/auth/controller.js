const moment = require('moment');
const bcrypt = require('bcrypt');
const { Usuario, Persona } = require('../../../store/db');
const auth = require('../../../auth');
let response = {};

const THIRTY_DAYS_IN_SEC = 2592000;
const TWO_HOURS_IN_SEC = 7200;

const getUserInfo = async (user) => {
    let { usuarioId, user_name, personaId, forzar_cambio_password, dias_cambio_password, fecha_cambio_password } = user;
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
        nombre,
        fecha_nacimiento,
        generoId,
        email,
        dias_cambio_password,
        fecha_cambio_password,
        diasUpdatePass
    }
    return userInfo;
}
const login = async (req, res) => {
    const {user_name,password}=req.body;
    req.body={};
    const user = await Usuario.findOne({ where: { user_name, estadoId: 1 } });
    const { rememberMe } = false;
    if (!user) {
        response.code = -1;
        response.data = "Credenciales inválidas";
        return response;
    }

    return bcrypt.compare(password, user.password)
        .then(async (sonIguales) => {
            if (sonIguales === true) {
                const { usuarioId } = user;
                const data = {};
                const token = auth.sign({ usuarioId });
                data.token = token;
                data.userInfo = await getUserInfo(user);

                response.code = 1;
                response.data = data;

                res.cookie("mitoken", token, {
                    httpOnly: true,
                    maxAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC,
                    signed: true,
                    domain: 'localhost'
                });

                return response;
            }
            else {
                response.code = -1;
                response.data = 'Usuario y contraseña incorrectos';
                return response;
            }
        })
        .catch((error) => {
            response.code = -1;
            response.data = "No fue posible realizar la autenticación " + error;
            return response;
        });
}

module.exports = {
    login
}