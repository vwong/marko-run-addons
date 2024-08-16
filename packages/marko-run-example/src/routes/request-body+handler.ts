export const POST: MarkoRun.Handler = (context) => {
  context.flash.success("Success!");
  return new Response(null, {
    status: 302,
    headers: {
      location: context.url.pathname,
    },
  });
};
