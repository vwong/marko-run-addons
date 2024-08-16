import TTLCache from "@isaacs/ttlcache";
import type { Session, SessionStore } from "@vwong/marko-run-addons/server";

export class MemorySessionStore implements SessionStore {
  #cache: TTLCache<string, Session>;

  constructor({ maxAge }: { maxAge: number }) {
    this.#cache = new TTLCache({ ttl: maxAge });
  }

  get(key: string): Promise<Session | undefined> {
    return Promise.resolve(
      this.#cache.has(key) ? this.#cache.get(key) : undefined,
    );
  }

  set(key: string, value: Session) {
    this.#cache.set(key, value);
    return Promise.resolve();
  }
}
