import type { State } from "./state.js";

export async function commandPokedex(state: State) {
   if (Object.keys(state.pokedex).length === 0) {
      console.log("Your Pokedex is empty. Go catch some Pokemon!");
      return;
   }

   console.log("Your Pokedex:");
   for (const name in state.pokedex) {
      console.log(` - ${name}`);
   }
}
