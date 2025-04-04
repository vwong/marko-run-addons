interface History {
  name: string;
  score: number;
}

export interface FrecencySession {
  _frecency?: Record<string, History[]>;
}

interface FrecencyServiceOptions {
  decay: number;
  session: FrecencySession;
}

export class FrecencyService {
  readonly #decay: number;
  readonly #session: FrecencySession;

  constructor({ decay, session }: FrecencyServiceOptions) {
    this.#decay = decay;
    this.#session = session;
    this.#session._frecency ||= {};
  }

  clear(type: string, name: string) {
    const index = this.history[type].findIndex((h) => h.name === name);
    this.history[type].splice(index, 1);
  }

  list(type: string) {
    return (this.history[type] || []).sort((a, b) => b.score - a.score);
  }

  visit(type: string, name: string, score = 1): void {
    this.history[type] ||= [];
    this.age(type);
    this.increment(type, name, score);
  }

  private increment(type: string, name: string, score: number): void {
    const entry = this.history[type].find((h) => h.name === name);
    if (entry) {
      entry.score += score;
    } else {
      this.history[type].push({ name, score });
    }
  }

  private age(type: string): void {
    this.history[type] = this.history[type]
      .map(({ name, score }) => ({ name, score: score * this.#decay }))
      .filter(({ score }) => score >= 0.75);
  }

  private get history() {
    return this.#session._frecency!;
  }
}

export interface FrecencyOptions {
  decay: number;
}

export const frecency =
  ({ decay }: FrecencyOptions): MarkoRun.Handler =>
  (context) => {
    context.frecency = new FrecencyService({
      decay,
      session: context.session,
    });
  };
