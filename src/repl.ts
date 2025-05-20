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
      const cleanedInput = cleanInput(input);
      if (cleanedInput.length > 0) {
         const commandName = cleanedInput[0];
         if (commandName in state.commands) {
            try {
               await state.commands[commandName].callback(state);
            } catch (err) {
               console.log("Network error");
            }
         } else {
            console.log("Unknown command");
         }
      }
      state.rl.prompt();
   });
}
