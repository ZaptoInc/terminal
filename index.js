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
    var command = terminal.currentCommand
    terminal.addLog($('#current-cmd').html())

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
        } else if (command == ""){
            
        } else {
            terminal.addLog("Unknown command..")
        }

    // // send command to server
    // if (command.startsWith("echo ")) {
    //     addLog(command.replace("echo ", ""))
    // } else if (command == "exit") {
    //     close() // close tab
    // } else if (command == "clear") {
    //     $("#logs").html("")
    //     addLog("Console cleared !")
    // } else {
    //     addLog("Unknown command..")
    // }
    terminal.currentCommand = ""
    terminal.updateCurrentCommand()
}

function upKey(e) {
    if (terminal.selectedCommand == -1) {
        terminal.typedCommand = terminal.currentCommand
    }
    if (terminal.selectedCommand < commandHistory.length - 1) {
        terminal.selectedCommand += 1
    }
    e.target.value = commandHistory[terminal.selectedCommand]
}

function downKey(e) {
    if (terminal.selectedCommand > -1) {
        terminal.selectedCommand -= 1
    }
    if (terminal.selectedCommand == -1) {
        terminal.currentCommand = terminal.typedCommand
    } else {
        e.target.value = commandHistory[terminal.selectedCommand]
    }

}

$('body').keydown(function (e) {

    if (e.keyCode == 13) {
        enterKey(e)
    } else if (e.keyCode == 38) {
        upKey(e)
    } else if (e.keyCode == 40) {
        downKey(e)
    } else {
        terminal.currentCommand = terminal.currentCommand + String.fromCharCode(e.which).toLowerCase()
        terminal.updateCurrentCommand()
    }
});

terminal.updateCurrentCommand()