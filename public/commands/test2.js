export const command = {
    command : "test2",
    aliases : [""],
    execute : async function(args, terminal){
        args.shift() //removes the command from the args
        terminal.sendToSocket("test2", args)
    },

    load : function(terminal) {
        const that = this
    //     terminal.setSocketEvent("test", function(obj){
    //         that.execute(`${obj.command} ${obj.data}`.split(" "), terminal)     
    //     })
    },

    infos : async function(terminal){ 
        terminal.addLog(this.command + " [arg ...] :") 
        terminal.addLog("Test.") 
    },
    
    simpleInfos : async function(terminal){ 
        terminal.addLog(this.command + " [arg ...]") 
    }
}

