import { redirect } from "#lib/responses";

export const POST: MarkoRun.Handler = (context) => {
  if (Math.random() > 0.5) {
    context.flash.success("Successfully processed! Form has been reset");
    context.body = undefined;
  } else {
    context.flash.error("Failed to process. Unsaved form is preserved");
  }

  return redirect(context.url.pathname);
};
