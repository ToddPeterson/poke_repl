import type { State } from "./state.js";

export async function commandInspect(state: State, name: string) {
   if (!name) {
      console.log("Usage: inspect <pokemon>");
      return;
   }
   if (!(name in state.pokedex)) {
      console.log("You have not caught that Pokemon");
      return;
   }

   const pokemon = state.pokedex[name];

   console.log(`Name: ${pokemon.name}`);
   console.log(`Height: ${pokemon.height}`);
   console.log(`Weight: ${pokemon.weight}`);
   console.log("Stats:");
   pokemon.stats.forEach((stat) => {
      console.log(` - ${stat.stat.name}: ${stat.base_stat}`);
   });
   console.log("Types:");
   pokemon.types.forEach((typ) => {
      console.log(` - ${typ.type.name}`);
   });
}
