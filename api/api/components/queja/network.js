const express = require('express');
const controller = require('./controller');
const response = require('../../../network/response');
const router = express.Router();

const listar=(req,res,next)=>{
    controller.list(req)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch(next);
}

const actualizar = (req, res, next) => {
    controller.update(req)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

const listReporte = (req, res, next) => {
    controller.listReporte(req)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}
router.get('/', listar);
router.put('/',actualizar);
router.get('/:id',listReporte);

module.exports = router;