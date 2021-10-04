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

const listItems = (req, res, next) => {
    controller.listItems(req)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}
const listInfo = (req, res, next) => {
    controller.listInfo(req)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}
router.post('/list', listar);
router.put('/',actualizar);
router.get('/:id',listItems);
router.get('/info/:id',listInfo)

module.exports = router;