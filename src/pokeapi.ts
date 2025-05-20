import { Cache } from "./pokecache.js";

export class PokeAPI {
   private static readonly baseURL = "https://pokeapi.co/api/v2";
   private cache: Cache;

   constructor(cacheInterval: number) {
      this.cache = new Cache(cacheInterval);
   }

   closeCache() {
      this.cache.stopReapLoop();
   }

   async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
      if (!pageURL) {
         pageURL = `${PokeAPI.baseURL}/location-area?limit=20`;
      }

      const cachedVal = this.cache.get<ShallowLocations>(pageURL);
      if (cachedVal) {
         return cachedVal;
      }

      try {
         const response = await fetch(pageURL);

         if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
         }

         const locations: ShallowLocations = await response.json();
         this.cache.add(pageURL, locations);
   
         return locations;
      } catch (err) {
         throw new Error(`Error fetching location areas: ${(err as Error).message}`);
      }
   }

   // async fetchLocation(locationName: string): Promise<Location> {}
}

export type ShallowLocations = {
   count: number;
   next: string;
   previous: string;
   results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};
