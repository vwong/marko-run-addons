export interface PageLoader {
  sleep3Promise: Promise<void>;
  sleep5Promise: Promise<void>;
}

const sleep = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration)) as Promise<void>;

export default {
  load: (): PageLoader => ({
    sleep3Promise: sleep(3000),
    sleep5Promise: sleep(5000),
  }),
};
