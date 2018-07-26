import { UNKNOWN_ENDPOINT, UNKNOWN_ERROR } from '@/constants/error'
import { IContext } from '@/@types/types'

/**
 * Return middleware that handle exceptions in Koa.
 * Dispose to the first middleware.
 *
 * @return {function} Koa middleware.
 */
export default async function errorHandler(ctx: IContext, next: () => Promise<any>): Promise<void> {
  try {
    await next()

    // Respond 404 Not Found for unhandled request
    if (!ctx.body && (!ctx.status || ctx.status === 404)) {
      ctx.res.notFound(UNKNOWN_ENDPOINT.type, UNKNOWN_ENDPOINT.message)
    }
  } catch (err) {
    // response with data passed in ctx.throw()
    if (err.expose) {
      ctx.status = err.status
      ctx.body = err.message
    } else {
      ctx.res.internalServerError(
        err.type || UNKNOWN_ERROR.type,
        err.message || UNKNOWN_ERROR.message,
      )
    }

    // Recommended for centralized error reporting,
    // retaining the default behaviour in Koa
    // ctx.app.emit('error', err, ctx)
  }
}
