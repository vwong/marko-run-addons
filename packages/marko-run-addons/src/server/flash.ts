export interface FlashMessage {
  id: number;
  message: string;
  status: "error" | "success" | "information" | "warning";
}

export interface FlashSession {
  _flash?: FlashMessage[];
}

export class FlashService {
  readonly #session: FlashSession;
  readonly #previous: FlashMessage[];
  error: (message: string) => void;
  information: (message: string) => void;
  success: (message: string) => void;
  warning: (message: string) => void;

  constructor({ session }: { session: FlashSession }) {
    this.#session = session;
    this.#previous = session._flash || [];
    session._flash = [];

    this.error = this.#set("error");
    this.information = this.#set("information");
    this.success = this.#set("success");
    this.warning = this.#set("warning");
  }

  get current(): FlashMessage[] {
    return this.#previous;
  }

  get next(): FlashMessage[] {
    return this.#session._flash!;
  }

  #set(status: FlashMessage["status"]) {
    return (message: string): void => {
      this.#session._flash!.push({
        id: Math.random(),
        message,
        status,
      });
    };
  }
}

export const flash = (): MarkoRun.Handler => (context) => {
  context.flash = new FlashService({
    session: context.session,
  });
};
