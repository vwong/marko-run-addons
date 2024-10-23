export const redirect = (location: string): Response => {
  return new Response(null, {
    status: 302,
    headers: {
      location,
    },
  });
};

export const badRequest = (payload: unknown): Response => {
  return new Response(JSON.stringify(payload), {
    status: 400,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
