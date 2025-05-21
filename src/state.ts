import { createInterface, type Interface } from "readline";

import { getCommands } from "./commands.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";

const PROMPT = "Pokedex ❯ ";

export type State = {
   rl: Interface;
   commands: Record<string, CLICommand>;
   api: PokeAPI;
   nextLocationURL: string | null;
   previousLocationURL: string | null;
   pokedex: Record<string, Pokemon>;
};

export type CLICommand = {
   name: string;
   description: string;
   callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(cacheInterval: number): State {
   return {
      rl: createInterface({
         input: process.stdin,
         output: process.stdout,
         prompt: PROMPT,
      }),
      commands: getCommands(),
      api: new PokeAPI(cacheInterval),
      nextLocationURL: null,
      previousLocationURL: null,
      pokedex: {},
   };
}
