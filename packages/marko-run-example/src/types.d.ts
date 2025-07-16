import type { Contents } from "#lib/contents";

declare module "@marko/run" {
  interface Context {
    contents: Contents;
    cspNonce: string;
    csrfToken: string;
    isHardReload: boolean;
    isXHR: boolean;
    loader: unknown;
    renderId: string;
  }
}

declare module "@vwong/marko-run-addons/server" {
  interface Session {
    count: number;
    theme?: "dark" | "light" | "";
  }
}

export {}; /* make this a module */
