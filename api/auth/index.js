const jwt = require('jsonwebtoken');
const config = require('../config');

const secret = config.jwt.secret;
function sign(data) {
    return jwt.sign({ data }, secret);
}

const validarpermiso = async (req, menuId, accesoId) => {
    let response = {};
    const permisos = req.user.actions;
    let permiso = await permisos.find(item => item.menuId === menuId && item.accesoId === accesoId);
    if (permiso === undefined) {
        response.code = -1;
        response.data = "No esta autorizado para realizar esta acción";
        return response;
    } else {
        return true;
    }
}

module.exports = {
    sign,
    validarpermiso
}
// "start": "node api/index.js"