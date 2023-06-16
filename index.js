import { commandManager } from "./commands.js"
import { terminalManager } from "./terminal.js"

var cmd = commandManager

var terminal = terminalManager

cmd.addCommand("./commands/exit.js")
cmd.addCommand("./commands/echo.js")
cmd.addCommand("./commands/clear.js")

// var user = {
//     name: "maxew",
//     token: ""
// }

// var commandHistory = []
// var currentCommand = ""
// var selectedCommand = -1

// var path = "~"
// var domain = document.location.host
// var prefix = '$\u00A0'

// function updateCurrent(username, domain, path, prefix) {
//     var obj = {
//         username,
//         domain,
//         path,
//         prefix
//     }
//     var torender = $("#console").html()
//     console.log(torender)
//     var render = Mustache.render(torender, obj);
//     console.log(render)
//     $("#current-cmd").html(render)
// }

// function addLog(log) {
//  $("#logs").append('<p class="log">' + log + '<br></p>')
//  // Scroll to the bottom
//  window.scrollTo(0, document.body.scrollHeight);

// }

function enterKey(e) {
    var command = $("#command").val()
    terminal.addLog($('.current span label').html() + $('#command').val())

    terminal.commandHistory.push(command)

    var parsedCommand = command.split(" ")

    if (cmd.commands[parsedCommand[0]]) {
        cmd.commands[parsedCommand[0]].execute(parsedCommand, terminal)
    } else if (parsedCommand[0] == "help") {
        parsedCommand.shift()
        if (parsedCommand.length > 0) {
            if (cmd.commands[parsedCommand[0]]) {
                cmd.commands[parsedCommand[0]].infos(terminal)
            }
        } else {
            for (const [key, value] of Object.entries(cmd.commands)) {
                value.simpleInfos(terminal)
            }
        }
    } else if (command == "") {

    } else {
        terminal.addLog("Unknown command..")
    }

    $('#command').val("")
}

$('body').keydown(function (e) {
    if (e.keyCode == 13) { //enter
        enterKey(e)
    } 
});

$('body').click(function() {
    $("#command").focus()
})

terminal.updateCurrentCommand()