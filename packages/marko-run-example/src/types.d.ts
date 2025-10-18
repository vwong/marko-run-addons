import type { Contents } from "#lib/contents";

declare module "@marko/run" {
  interface Context {
    contents: Contents;
    cspNonce: string;
    isHardReload: boolean;
    isXHR: boolean;
    loader: unknown;
  }
}

declare module "@vwong/marko-run-addons/server" {
  interface Session {
    count: number;
    theme?: "dark" | "light" | "";
  }
}

export {}; /* make this a module */
