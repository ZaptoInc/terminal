export const command = {
    command : "echo",
    execute : async function(args, terminal){
        args.shift() //removes the command from the args
        terminal.addLog(args.join(" "))
    },

    load : function(terminal) {
        const that = this
        terminal.setSocketEvent("echo", function(obj){
            that.execute(`${obj.command} ${obj.data}`.split(" "), terminal)     
        })
    },

    infos : async function(terminal){ 
        terminal.addLog(this.command + " [arg ...] :") 
        terminal.addLog("Retourne les arguments dans l'historique du terminal.") 
    },
    
    simpleInfos : async function(terminal){ 
        terminal.addLog(this.command + " [arg ...]") 
    }
}

