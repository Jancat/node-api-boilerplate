import { Context } from 'koa'

function demo(ctx: Context): void {
  ctx.body = 'It works!'
}

/**
 * Demo Error Responder: Deliberataly return 500 error for testing.
 */
function error(ctx: Context): void {
  ctx.status = 500
  ctx.message = 'App Error (this is intentional)!'
}

/**
 * Demo Error Responder: Deliberataly return 500 error without message for testing.
 */
function errorWithoutMessage(): never {
  console.log('About to throw an error deliberately, ignore it.')
  throw new Error('')
}

export { demo, error, errorWithoutMessage }
