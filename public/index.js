import { commandManager } from "./commands.js"
import { terminalManager } from "./terminal.js"

var cmd = commandManager

var terminal = terminalManager

cmd.addCommand("./commands/exit.js", terminal)
cmd.addCommand("./commands/echo.js", terminal)
cmd.addCommand("./commands/clear.js", terminal)
cmd.addCommand("./commands/message.js", terminal)
cmd.addCommand("./commands/test.js", terminal)
cmd.addCommand("./commands/test2.js", terminal)


function enterKey(e) {
    var command = $("#command").val() //get command
    terminal.addLog($('.current span label').html() + $('#command').val()) //logs the command

    if (command == "") return //return if the command is empty (new line)

    terminal.commandHistory.push(command) //adds the command to history

    var parsedCommand = command.split(" ") //parse the command as array

    if (cmd.commands[parsedCommand[0]]) { //if the command exists in cmd
        cmd.commands[parsedCommand[0]].execute(parsedCommand, terminal) //execute the command's execute function
    } else if (parsedCommand[0] == "help") { //if the command doesn't exists, checks if the command is "help"
        parsedCommand.shift() //remove the "help" part of the the command
        if (parsedCommand.length > 0) { //checks if the command have args
            if (cmd.commands[parsedCommand[0]]) { //checks if the command exist
                cmd.commands[parsedCommand[0]].infos(terminal) //executes the command's infos function
            } else {
                terminal.addLog("help [command] :")
                terminal.addLog("Affiche l'aide de la commande")
            }
        } else {
            for (const [key, value] of Object.entries(cmd.commands)) {
                value.simpleInfos(terminal) //shows the simple infos about all the commands
            }
        }
    } else {
        terminal.addLog("Unknown command... type 'help' for help")
    }

    $('#command').val("")
}

$('body').keydown(function (e) {
    if (e.keyCode == 13) { //enter
        enterKey(e)
    } 
});

$(document).mouseup(function(){
    var highlightedText = "";
    if (window.getSelection) {
        highlightedText = window.getSelection().toString();
    } 
    else if (document.selection && document.selection.type != "Control") {
        highlightedText = document.selection.createRange().text;
    }
    if(highlightedText != ""){
        // console.log(highlightedText);
        navigator.clipboard.writeText(highlightedText)
    }
});

// Focus on input when clicking on the page
$('body').click(function() {
    $("#command").focus()
})

terminal.updateCurrentCommand() //Displays the terminal input text {user}@{domain}:{path}{prefix}
terminal.initialize()