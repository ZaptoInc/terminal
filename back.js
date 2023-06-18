const express = require('express') // web server

const {wsManager} = require('./ws.js') //websocket manager

const crypto = require('crypto') // cryptographics (for md5)

const {userManager} = require('./user.js') // user manager

const {config, env} = require('./config.js') // config manager

var loki = require('lokijs') // database

var db = new loki(config.database) //database object

userManager.setDatabase(db)

// var token = userManager.signToken({"test":false})
// console.log(token)
// var user = userManager.verifyToken(token);
// console.log(user)

const app = express()

// serve files in public/
app.use(express.static('public'))

app.get('/env', (req, res) => {
    res.send(env)
})

// websocket server
wsManager.initialize()
// add a socket event for 'initialized' 
wsManager.setSocketEvent("initialized", function(obj, socket){
    // if no session, make the front send the message 'motd.txt'
    if(!obj.data.session) {
        wsManager.sendToSocket(socket, "message", "motd.txt")
    }
    // create the initialized object with session id then send the event
    var initialized = {
        session : crypto.createHash('md5').update(Date.now().toString()).digest("hex")
    }
    wsManager.sendToSocket(socket, "initialized", initialized)

    // default user object
    var current_user = {
        name: "anon",
        token: null,
        superUser: false
    }
    // check if a token exists
    if (obj.data.token) {       
       token_user = userManager.verifyToken(token)
       if (token_user) {
        // current use
        current_user = {
            ...current_user,
            ...token_user
           }
       }
    }
    // send the current user
    wsManager.sendToSocket(socket, "user_update", current_user)
})

// start express.js server
const server = app.listen(config.port, () => {
    console.log(`Env ${env} listening on port ${config.port}`)
})

// on http upgrade to websocket
server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});