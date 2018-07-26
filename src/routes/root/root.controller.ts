import { Context } from 'koa'

/**
 * Root GET Handler: Just return the API name.
 */
function root(ctx: Context): void {
  ctx.body = 'Node API Boilerplate'
}

export { root }
