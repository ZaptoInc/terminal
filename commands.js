export const commandManager = {
    commands : {},
    addCommand : async function(file) {
        const {command} = await import(file);
        if(!this.commands[command.command]) {
            this.commands[command.command] = command
        }
        if(command.aliases) {
            command.aliases.forEach(alias => {
                if(!this.commands[alias]) {
                    this.commands[alias] = command
                }
            });
        }
    }
}