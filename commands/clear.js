export const command = {
    command : "clear",
    execute : async function(args, terminal){
        args.shift()
        $("#logs").html("")
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