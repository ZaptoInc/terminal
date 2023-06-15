export const command = {
    command : "echo",
    execute : async function(args, terminal){
        args.shift()
        terminal.addLog(args.join(" "))
    },
    infos : async function(terminal){ 
        terminal.addLog(this.command + " [arg ...] :") 
        terminal.addLog("Retourne les arguments dans l'historique du terminal.") 
    },
    simpleInfos : async function(terminal){ 
        terminal.addLog(this.command + " [arg ...]") 
    }
}