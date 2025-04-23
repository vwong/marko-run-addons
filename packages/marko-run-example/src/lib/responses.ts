export const json = (payload: unknown) =>
  new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });

export const redirect = (location: string) =>
  new Response(null, {
    status: 302,
    headers: {
      location,
    },
  });

export const badRequest = (payload: unknown) =>
  new Response(JSON.stringify(payload), {
    status: 400,
    headers: {
      "Content-Type": "application/json",
    },
  });
