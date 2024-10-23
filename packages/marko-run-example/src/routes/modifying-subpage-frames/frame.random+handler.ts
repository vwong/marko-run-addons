import { redirect } from "#lib/responses";

export const POST: MarkoRun.Handler = async (context) => {
  return redirect(
    context.isXHR
      ? context.url.pathname
      : context.request.headers.get("referer")!,
  );
};
