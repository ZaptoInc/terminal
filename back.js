const express = require('express')

const {wsManager} = require('./ws.js');

const crypto = require('crypto')

// prod/dev arg
var env = process.env.NODE_ENV || 'dev';

var allConfigs = require('./config.json')

// adds the envconfig to the 'common' config
var config = { 
    ...allConfigs.common,
    ...allConfigs[env]
}

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
       //todo 
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