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
        var collection = db.getCollection("users")
        if (collection) {

        } else {
            collection = db.addCollection("users", {indices : ["name"]})
        }
        this.database = collection
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
        user = {...this.defaultUser, ...user}
        if (this.usernameAllowed(user.name)) {
            if (this.getUserFromName(user.name)) {
                var result = this.database.insert(user)
                console.log(result)
                return result
            } else return null 
        } else return undefined
    },
    getUserFromName : function(username) {
        var result = this.database.where(function(obj){return obj.name == username})
        console.log(result)
        if (result.length = 1) {
            return result[0]
        } else {
            return null
        }
        
    },
    saveUser : function(user) {
        return this.database.update(user)
    }
}

exports.userManager = userManager