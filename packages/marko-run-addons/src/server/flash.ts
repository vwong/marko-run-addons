export interface FlashMessage {
  id: number;
  message: string;
  status: "error" | "success" | "information" | "warning";
}

export interface FlashSession {
  _flash?: FlashMessage[];
}

export class FlashService {
  current: FlashMessage[];
  next: FlashMessage[];
  error: (message: string, immediate?: boolean) => void;
  information: (message: string, immediate?: boolean) => void;
  success: (message: string, immediate?: boolean) => void;
  warning: (message: string, immediate?: boolean) => void;

  constructor({ session }: { session: FlashSession }) {
    this.current = session._flash || [];
    session._flash = [];
    this.next = session._flash;

    this.error = this.#set("error");
    this.information = this.#set("information");
    this.success = this.#set("success");
    this.warning = this.#set("warning");
  }

  #set(status: FlashMessage["status"]) {
    return (message: string, immediate?: boolean): void => {
      const messages = immediate ? this.current : this.next;

      messages.push({
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

declare module "@marko/run" {
  interface Context {
    flash: FlashService;
  }
}
