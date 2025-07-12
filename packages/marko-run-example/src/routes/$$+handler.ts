import page from "./+404.marko";

// built-in @marko/run 404 handler doesn't run middleware and handlers, so we emulate it using a catch-all
export const GET: MarkoRun.Handler = (context) =>
  context.render(page, {}, { status: 404 });
