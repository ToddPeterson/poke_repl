import { createInterface, type Interface } from "readline";

import { commandExit } from './command_exit.js';
import { commandExplore } from "./command_explore.js";
import { commandHelp } from './command_help.js';
import { commandMap, commandMapb } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js";

const PROMPT = "Pokedex > "

export type State = {
   rl: Interface;
   commands: Record<string, CLICommand>;
   api: PokeAPI;
   nextLocationURL: string | null;
   previousLocationURL: string | null;
};

export type CLICommand = {
   name: string;
   description: string;
   callback: (state: State, ...args: string[]) => Promise<void>;
};

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
    },
    map: {
      name: "map",
      description: "List the next 20 location areas",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "List the previous 20 location areas",
      callback: commandMapb,
    },
    explore: {
      name: "explore <area_name>",
      description: "Explore an area",
      callback: commandExplore,
    }
  };
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
   };
};
