var jwt = require('jsonwebtoken')
const {config} = require('./config.js');
const userManager = {
    defaultUser : {
        name: "anon",
        token: null,
        superUser: false
    },
    database : null,
    setDatabase : function(db) {
        this.database = db.addCollection("users", {indices : ["name"]})
    },
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
    },
    usernameAllowed : function(username) {
        return /^[a-z0-9][-a-z0-9_]{1,9}/i.test(username)
    },
    createUser : function(user) {
        if (this.usernameAllowed(user.name)) {
            if (getUserFromName(user.name)) {
                return this.database.insert(user)
            } else return null 
        } else return undefined
    },
    getUserFromName : function(username) {
        return this.database.where(function(obj){return obj.name == username})
    },
    saveUser : function(user) {
        return this.database.update(user)
    }
}

exports.userManager = userManager