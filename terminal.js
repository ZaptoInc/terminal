export const terminalManager = {
    commandHistory: [],
    selectedCommand : -1,
    currentCommand: "",
    typedCommand: "",
    path: "~",
    domain: document.location.host,
    user: {
        name: "anon",
        token: "",
        superUser: false
    },

    addLog: function (log) {
        $("#logs").append('<p class="log">' + log + '</p>')
        // Scroll to the bottom
        window.scrollTo(0, document.body.scrollHeight);
    },

    updateCurrentCommand: function() {
        var obj = {
            username : this.user.name,
            domain : this.domain,
            path : this.path,
            prefix : this.getPrefix(),
            command : this.currentCommand
        }
        var torender = $("#console").html()
        console.log(torender)
        var render = Mustache.render(torender, obj);
        console.log(render)
        $("#current-cmd").html(render)
    },

    getPrefix: function() {
        if (this.user.superUser) {
            return "#\u00A0"
        } else {
            return "$\u00A0"
        }
    }

}