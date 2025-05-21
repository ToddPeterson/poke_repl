import type { State } from "./state.js";


export function cleanInput(input: string): string[] {
   return input
      .trim()
      .toLowerCase()
      .split(" ")
      .filter((word) => word !== '');
}

export function startREPL(state: State) {
   state.rl.prompt();

   state.rl.on("line", async (input: string) => {
      const words = cleanInput(input);
      if (words.length > 0) {
         const [commandName, ...args] = words;
         if (commandName in state.commands) {
            const command = state.commands[commandName];
            try {
               await command.callback(state, ...args);
            } catch (err) {
               console.log((err as Error).message);
            }
         } else {
            console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`);
         }
      }

      state.rl.prompt();
   });
}
