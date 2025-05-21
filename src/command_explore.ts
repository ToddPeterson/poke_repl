import type { State } from "./state.js";

export async function commandExplore(state: State, locationName: string) {
   if (!locationName) {
      console.log("Usage: explore <area_name>");
      return;
   }

   console.log(`Exploring ${locationName}...`);
   const location = await state.api.fetchLocation(locationName);
   location.pokemon_encounters.forEach((encounter) => {
      console.log(` - ${encounter.pokemon.name}`);
   });
};
