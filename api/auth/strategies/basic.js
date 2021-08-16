const passport = require('passport');
const bcrypt = require('bcrypt');
const { BasicStrategy } = require('passport-http');
const { Usuario } = require('../../store/db');
const error=require('../../network/errors');

passport.use(new BasicStrategy(async function (user_name, password, cb) {
    try {
        const user = await Usuario.findOne({ where: { user_name } });

        if (!user) {
            return cb('boom.unauthorized()', false);
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return cb('boom.unauthorized()', false);
        }
        delete user.password;
        return cb(null, user);
    } catch (error) {
        return cb(error);
    }
}));