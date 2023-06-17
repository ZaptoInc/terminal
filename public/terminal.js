export const terminalManager = {
    commandHistory: [],
    selectedCommand: -1,
    currentCommand: "",
    typedCommand: "",
    path: "~",
    domain: document.location.host,
    user: {
        name: "anon",
        token: null,
        superUser: false
    },

    session: null,

    socket: null,

    socketEvents : {},

    addLog: function (log) {
        $("#logs").append('<p class="log">' + log + '</p>')
        // Scroll to the bottom
        window.scrollTo(0, document.body.scrollHeight);
    },

    updateCurrentCommand: function () {
        var obj = {
            username: this.user.name,
            domain: this.domain,
            path: this.path,
            prefix: this.getPrefix(),
            command: this.currentCommand
        }
        var torender = $("#console").html()
        var render = Mustache.render(torender, obj);
        $("#current-cmd").html(render)
    },

    getPrefix: function () {
        if (this.user.superUser) {
            return "#\u00A0"
        } else {
            return "$\u00A0"
        }
    },
    sendToSocket: function (command, data) {
        var message = JSON.stringify({
            command,
            data
        })
        this.socket.send(message)
    },

    initializeSocket: function (terminal) {
        this.socket = new WebSocket(`ws://${document.location.host}`)
        this.socket.addEventListener("open", function(event) {
            terminal.sendToSocket("initialized", {session : terminal.session, token : terminal.user.token})
        });
        this.socket.addEventListener("close", function(event) {
            setTimeout(function() { terminal.initializeSocket(terminal) }, 5000);
        });
        this.socket.addEventListener("message", function(event) {
            var obj = JSON.parse(event.data)
            if (obj.command && terminal.socketEvents[obj.command]) {
                terminal.socketEvents[obj.command](obj)
            }
        });
        this.setSocketEvent("initialized", function(obj){
            terminal.session = obj.data.session
        })
        this.setSocketEvent("user_update", function(obj){
            terminal.user = obj.data
            terminal.updateCurrentCommand()
        })
    },

    setSocketEvent : function(command, func) {
        this.socketEvents[command] = func
    },

    initialize: function () {
        this.initializeSocket(this)     
    }
}

