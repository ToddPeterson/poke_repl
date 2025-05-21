import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMap, commandMapb } from "./command_map.js";
import { commandPokedex } from "./command_pokedex.js";

import type { CLICommand } from "./state.js";

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
      },
      catch: {
         name: "catch <pokemon>",
         description: "Try to catch a pokemon",
         callback: commandCatch,
      },
      inspect: {
         name: "inspect <pokemon>",
         description: "Get information about a pokemon in your Pokedex",
         callback: commandInspect,
      },
      pokedex: {
         name: "pokedex",
         description: "View your Pokedex",
         callback: commandPokedex,
      },
   };
}
