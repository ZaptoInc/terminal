export const command = {
    command : "clear",
    aliases : ["clr"],
    execute : async function(args, terminal){
        // args.shift() //removes the command from the args
        $("#logs").html("")
        terminal.addLog($('.current span label').html() + args[0])
        terminal.addLog("Console cleared !")
    },
    infos : async function(terminal){ 
        terminal.addLog(this.command + " :")
        terminal.addLog("Vide l'historique du terminal")
    },
    simpleInfos : async function(terminal){ 
        terminal.addLog(this.command) 
    }
}