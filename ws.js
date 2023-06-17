const ws = require('ws');
const wsManager = {
    wsServer: null,
    socketEvents: {},
    initialize: function () {
        var manager = this
        wsServer = new ws.Server({ noServer: true });
        wsServer.on('connection', socket => {
            console.log("[WS] new client connected");
            socket.on('message', (data, isBinary) => {
                var message = isBinary ? data : data.toString()
                var obj = JSON.parse(message)
                if (obj.command && manager.socketEvents[obj.command]) {
                    manager.socketEvents[obj.command](obj, socket)
                }
            });
        });
    },
    sendToSocket: function (socket, command, data) {
        var message = JSON.stringify({
            command,
            data
        })
        socket.send(message)
    },
    setSocketEvent : function(command, func) {
        this.socketEvents[command] = func
    }
}

exports.wsManager = wsManager