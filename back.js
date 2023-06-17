const express = require('express')
const ws = require('ws');
const app = express()
const port = 3000
// prod/dev arg
var env = process.env.NODE_ENV || 'dev';

// serve files in public/
app.use(express.static('public'))

app.get('/env', (req, res) => {
    res.send(env)
})

// websocket server

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
    console.log("[WS] new client connected");
    socket.on('message', (data, isBinary) => {
        var message = isBinary ? data : data.toString()
        console.log(message)
        socket.send(message);
    });
});

// live reload on dev
if (env == 'dev') {
}

// start express.js server
const server = app.listen(port, () => {
    console.log(`Env ${env} listening on port ${port}`)
})

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});