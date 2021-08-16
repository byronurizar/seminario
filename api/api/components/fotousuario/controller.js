const sharp = require("sharp");
const { FotoUsuario } = require('../../../store/db');
const { validarpermiso } = require('../../../auth');
const MenuId = 28;
let response = {};

const RedimencionarImagen = (buffer) => {
    return new Promise((resolve, reject) => {
        sharp(buffer)
            .resize(100, 100)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toBuffer((error, data, info) => {
                if (!error) {
                    resolve(data);
                } else {
                    reject("Error");
                }
            });
    })
}
const insert = async (req) => {
    let autorizado = await validarpermiso(req, MenuId, 1);
    if (autorizado !== true) {
        return autorizado;
    }
    const dataAux = {};
	let { usuarioId: usuarioCrea } = req.user;
    let { descripcion } = req.body;
    let { file } = req;
    const { buffer, size, originalname, mimetype } = !!file && file;
    dataAux.descripcion = descripcion;
    dataAux.usuarioId = usuarioCrea;
    dataAux.nombre = originalname;
    if (mimetype !== "image/png" && mimetype !== "image/jpg" && mimetype !== "image/jpeg") {
        response.code = -1;
        response.data = "El formato de la imagen no es válido";
    }
    else {
        if (size <= 1000000) {
            
            dataAux.usuario_crea = usuarioCrea;

            return RedimencionarImagen(buffer)
                .then((res) => {
                    dataAux.foto = res;
                    dataAux.mimetype = "image/jpeg";
                    return FotoUsuario.create(dataAux)
                        .then((salida) => {
                            delete salida.dataValues.foto;
                            response.code = 1;
                            response.data = salida;
                            return response;
                        });
                });
        } else {
            response.code = -1;
            response.data = "La imagen no debe pesar más de 1 MB";
            return response;
        }
    }
}
module.exports = {
    insert
}