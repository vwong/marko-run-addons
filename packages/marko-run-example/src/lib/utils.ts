export const removeFalseyValues = (obj: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => !!v));
