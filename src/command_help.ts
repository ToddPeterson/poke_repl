import type { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
   console.log("Welcome to the Pokedex!\nusage:\n");
   for (const commandName in commands) {
      const command = commands[commandName];
      console.log(`${commandName}: ${command.description}`);
   }
};