const express = require('express');
const controller = require('./controller');
const controllerDepto = require('../departamento/controller');
const controllerMunicipios = require('../municipio/controller');
const controllerComercio = require('../comercio/controller');
const controllerSucursal = require('../sucursal/controller');
const response = require('../../../network/response');
const { uploadFiles } = require('../../../utils/multer.config');
const router = express.Router();

const registrar = (req, res, next) => {
    controller.insert(req)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

const listarDepartamentos = (req, res, next) => {
    controllerDepto.list(req, true)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}
const listarMunicipios = (req, res, next) => {
    controllerMunicipios.list(req, true)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

const listarComercios = (req, res, next) => {
    controllerComercio.list(req, true)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

const listarSucursales = (req, res, next) => {
    controllerSucursal.list(req, true)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

const listarComerciosPorMunicipio = (req, res, next) => {
    
    controller.getComerciosMunicipio(req)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

router.post('/',uploadFiles.array('files'), registrar);
router.get('/deptos', listarDepartamentos);
router.get('/muns', listarMunicipios);
// router.get('/comers', listarComercios);
router.get('/sucurs', listarSucursales);
router.get('/comers', listarComerciosPorMunicipio);
module.exports = router;