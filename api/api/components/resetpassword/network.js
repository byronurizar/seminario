const express = require('express');
const controller = require('./controller');
const response = require('../../../network/response');
const router = express.Router();

const enviarCorreo = (req, res, next) => {
    controller.enviarCorreo(req)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

const updatePass = (req, res, next) => {
    controller.updatePass(req)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}



router.post('/',enviarCorreo);
router.put('/',updatePass);
module.exports = router;