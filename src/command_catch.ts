import type { State } from "./state.ts";

export async function commandCatch(state: State, name: string) {
   if (!name) {
      console.log("Usage: catch <pokemon>");
      return;
   }

   console.log(`Throwing a Pokeball at ${name}...`);

   const pokemon = await state.api.fetchPokemon(name);
   const chance =  Math.max(100 - ((pokemon.base_experience - 30) / 3), 5);
   const success = Math.random() * 100 < chance;

   if (success) {
      state.pokedex[name] = pokemon;
      console.log(`${name} was caught!`);
   } else {
      console.log(`${name} escaped!`);
   }
};
