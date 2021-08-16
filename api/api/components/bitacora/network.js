const express = require('express');
const controller = require('./controller');
const response = require('../../../network/response');
const router = express.Router();

const cambios = (req, res, next) => {
    controller.cambios(req)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

const tablas = (req, res, next) => {
    controller.tablas(req)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

const peticiones = (req, res, next) => {
    controller.peticiones(req)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

const peticionesRequest = (req, res, next) => {
    controller.peticionesRequest(req)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

const peticionesResponse = (req, res, next) => {
    controller.peticionesResponse(req)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

router.post('/cambios', cambios);
router.get('/cambios/tablas', tablas);
router.post('/peticiones', peticiones);
router.get('/peticiones/request/:bitacora_peticionId', peticionesRequest);
router.get('/peticiones/response/:bitacora_peticionId', peticionesResponse);

module.exports = router;