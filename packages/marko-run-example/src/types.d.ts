declare module "@marko/run" {
  interface Context {
    cspNonce: string;
    csrfToken: string;
    isHardReload: boolean;
    isXHR: boolean;
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
