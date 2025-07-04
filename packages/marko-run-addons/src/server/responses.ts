export const noContent = (): Response => {
  return new Response(null, {
    status: 204,
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
