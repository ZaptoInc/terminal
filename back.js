const express = require('express')

const {wsManager} = require('./ws.js');

const crypto = require('crypto')

// prod/dev arg
var env = process.env.NODE_ENV || 'dev';

var allConfigs = require('./config.json')

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

wsManager.setSocketEvent("initialized", function(obj, socket){
    if(!obj.data.session) {
        wsManager.sendToSocket(socket, "message", "motd.txt")
    }

    var initialized = {
        session : crypto.createHash('md5').update(Date.now().toString()).digest("hex")
    }
    wsManager.sendToSocket(socket, "initialized", initialized)
    var current_user = {
        name: "anon",
        token: null,
        superUser: false
    }
    if (!obj.data.token) {       
        wsManager.sendToSocket(socket, "user_update", current_user)
    } else {

    }
})


// live reload on dev
if (env == 'dev') {
}

// start express.js server
const server = app.listen(config.port, () => {
    console.log(`Env ${env} listening on port ${config.port}`)
})

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});