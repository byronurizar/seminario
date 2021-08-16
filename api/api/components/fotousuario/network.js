const express = require('express');
const controller = require('./controller');
const response = require('../../../network/response');
const upload=require('../../../utils/multer.config');
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

router.post('/',upload.single('file'),registrar);
router.get('/', listar);
router.put('/',actualizar);
router.delete('/:id',eliminar);

module.exports = router;