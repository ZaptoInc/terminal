export const command = {
    command : "message",
    execute : async function(args, terminal){
        args.shift() //removes the command from the args

        args.forEach(arg => {
            $.get(`../messages/${arg}`, function(data) {
                for (var line in data.split('\n')) {
                    terminal.addLog(data.split('\n')[line])
                }
            }, 'text').fail(function() {
                terminal.addLog("Given file does not exist.")
            })
        });
    },

    infos : async function(terminal){ 
        terminal.addLog(this.command + " [filename] :") 
        terminal.addLog("Displays content of a given file.") 
    },
    
    simpleInfos : async function(terminal){ 
        terminal.addLog(this.command + " [filename]") 
    }
}