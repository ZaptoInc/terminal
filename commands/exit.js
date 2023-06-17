export const command = {
    command : "exit",
    execute : async function(args, terminal){
        args.shift() //removes the command from the args
        close()
    },
    infos : async function(terminal){ 
        terminal.addLog(this.command + " :") 
        terminal.addLog("Ferme le terminal.") 
    },
    simpleInfos : async function(terminal){ 
        terminal.addLog(this.command) 
    }
}