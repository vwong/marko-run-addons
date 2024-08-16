# An example @marko/run app

This is an example app demonstrating how to use `@vwong/marko-run-addons`. It
uses [middleware](../run-addons) to perform common operations.

In particular, some middleware requires additional configuration:

- [session](./src/lib/memorySessionStore.ts) is configured with an [in-memory
  TTL Cache](https://github.com/isaacs/ttlcache). In production, you might want
  to replace this with Redis or similar.
- [validation](./src/lib/ajvValidator.ts) is configured with
  [AJV](https://ajv.js.org/), which is handy if you need JSON-Schema to
  generate Open API specifications. If you want speed, perhaps use
  [Valibot](https://valibot.dev/) instead.
