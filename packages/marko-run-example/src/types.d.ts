declare module "@marko/run" {
  interface Context {
    componentIdPrefix: string;
    cspNonce: string;
    csrfToken: string;
    isXHR: boolean;
  }
}

declare module "@vwong/marko-run-addons/server" {
  interface Session {
    count: number;
    theme?: "dark" | "light" | "";
  }
}

export {}; /* make this a module */
