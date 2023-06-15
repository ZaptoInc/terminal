export const commandManager = {
    commands : {},
    addCommand : async function(file) {
        const {command} = await import(file);
        this.commands[command.command] = command
    }
}