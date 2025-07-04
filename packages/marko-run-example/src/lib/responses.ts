export const json = (payload: unknown) =>
  new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });

export const badRequest = (payload: unknown) =>
  new Response(JSON.stringify(payload), {
    status: 400,
    headers: {
      "Content-Type": "application/json",
    },
  });
