type CacheEntry<T> = {
   createdAt: number;
   val: T;
};

export class Cache {
   #cache = new Map<string, CacheEntry<any>>();
   #reapIntervalId: NodeJS.Timeout | undefined = undefined;
   #interval: number;

   constructor(interval: number) {
      this.#interval = interval;
      this.#startReapLoop();
   }

   add<T>(key: string, val: T) {
      const entry: CacheEntry<T> = {
         createdAt: Date.now(),
         val,
      };
      this.#cache.set(key, entry);
   }

   get<T>(key: string) {
      const entry = this.#cache.get(key);
      if (entry !== undefined) {
         return entry.val as T;
      }
      return undefined;
   }

   #reap() {
      const cutoff = Date.now() - this.#interval;
      this.#cache.forEach((value: CacheEntry<any>, key: string) => {
         if (value.createdAt < cutoff) {
            this.#cache.delete(key);
         }
      });
   }

   #startReapLoop() {
      this.#reapIntervalId = setInterval(this.#reap.bind(this), this.#interval);
   }

   stopReapLoop() {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
   }
}
