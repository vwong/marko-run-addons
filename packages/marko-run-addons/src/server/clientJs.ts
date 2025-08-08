import cookie from "cookie";

export const clientJs = (): MarkoRun.Handler => async (context, next) => {
  const isXHR = context.request.headers.has("X-Requested-With");
  const { clientJs } = cookie.parse(
    (context.request.headers.get("Cookie") as string) || "",
  );
  context.hasClientJs = !!(clientJs && clientJs === "true");

  const response = await next();

  if (response.headers.get("content-type")?.startsWith("text/html") && !isXHR) {
    response.headers.append(
      "Set-Cookie",
      "clientJs=false; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
    );
  }

  return response;
};

declare module "@marko/run" {
  interface Context {
    hasClientJs?: boolean;
  }
}
