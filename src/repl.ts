import { createInterface } from 'node:readline';
import type { CLICommand } from './command.js';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    }
  };
}

export function cleanInput(input: string): string[] {
   return input
      .trim()
      .toLowerCase()
      .split(" ")
      .filter((word) => word !== '');
}

export function startREPL() {
   const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "Pokedex > ",
   });
   const commands = getCommands();

   rl.prompt();
   rl.on("line", (input: string) => {
      const cleanedInput = cleanInput(input);
      if (cleanedInput.length > 0) {
         const commandName = cleanedInput[0];
         if (commandName in commands) {
            commands[commandName].callback(commands);
         } else {
            console.log("Unknown command");
         }
      }
      rl.prompt();
   });
}
