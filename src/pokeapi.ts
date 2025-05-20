export class PokeAPI {
   private static readonly baseURL = "https://pokeapi.co/api/v2";

   constructor() {}

   async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
      if (!pageURL) {
         pageURL = `${PokeAPI.baseURL}/location-area?limit=20`;
      }
      const response = await fetch(pageURL, {
         method: "GET",
      });

      return response.json()
   }

   // async fetchLocation(locationName: string): Promise<Location> {}
}

export type ShallowLocations = {
   count: number;
   next: string;
   previous: string;
   results: Location[];
};

export type Location = {
   name: string;
   url: string;
};
