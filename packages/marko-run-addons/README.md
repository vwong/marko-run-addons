# A collection of @marko/run middleware

[@marko/run](https://github.com/marko-js/run) is a great way to run your
[Marko](https://markojs.com/) apps. This collection of middleware supplements
it to do common operations like:

- [maintain a user session server-side](./src/session.ts)
- [show flash messages in response to user action](./src/flash.ts)
- [parses requests](./src/requestParser.ts)
- [protects form POST submissions against CSRF attacks](./src/csrf.ts)
- [validates request query and bodies](./src/validation.ts)

all running _server-side_.

## BYO Session + Validator

This collection tries to be as flexible as possible.

The `session` middleware exposes an abstract `SessionStore` class that needs to
be implemented in your code to store your server-side sessions.

Similarly the `validation` middleware exposes an abstract `Validator` class,
for you to plug your preferred validation library.

## Example

See the [complete example](../marko-run-example)
