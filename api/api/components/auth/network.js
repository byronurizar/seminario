const express = require('express');
const controller = require('./controller');
const response = require('../../../network/response');
const router = express.Router();

const login = (req, res, next) => {
    controller.login(req,res)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

router.post('/',login);

module.exports = router;