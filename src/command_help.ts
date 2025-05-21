import type { State } from "./state";

export async function commandHelp(state: State) {
   console.log("Welcome to the Pokedex!\nusage:\n");
   for (const commandName in state.commands) {
      const command = state.commands[commandName];
      console.log(`${command.name}: ${command.description}`);
   }
};