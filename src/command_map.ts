import type { State } from "./state.js";

export async function commandMap(state: State) {
   const locations = await state.api.fetchLocations(state.nextLocationURL);
   state.nextLocationURL = locations.next;
   state.previousLocationURL = locations.previous;
   locations.results.forEach((location) => {
      console.log(location.name);
   });
}

export async function commandMapb(state: State) {
   if (!state.previousLocationURL) {
      console.log("You're on the first page");
      return;
   }
   const locations = await state.api.fetchLocations(state.previousLocationURL);
   state.nextLocationURL = locations.next;
   state.previousLocationURL = locations.previous;
   locations.results.forEach((location) => {
      console.log(location.name);
   });
}
