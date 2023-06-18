var jwt = require('jsonwebtoken')
const {config} = require('./config.js');
const userManager = {
    verifyToken : function(token) {
        try {
            return jwt.verify(token, config.jwtKey);
        } catch (error) {
            return null
        }
    },
    signToken : function(user) {
        try {
            return jwt.sign(user, config.jwtKey);
        } catch (error) {
            return null
        }
    }
}

exports.userManager = userManager