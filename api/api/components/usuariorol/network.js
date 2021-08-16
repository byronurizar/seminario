const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();

const registrar = (req, res, next) => {
    controller.insert(req)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

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

const eliminar = (req, res, next) => {
    controller.eliminar(req)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

const prueba=(req,res,next)=>{
    controller.prueba(req,res)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch(next);
}

router.post('/',registrar);
router.get('/', listar);
router.put('/',actualizar);
router.delete('/:id',eliminar);
router.get('/prueba',prueba);
module.exports = router;