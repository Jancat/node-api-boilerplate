import logger from '@/services/logger'
import _ from 'lodash'
import { IContext } from '@/@types/types'

/**
 * Middleware that checks for required parameters.
 *
 * @param { string[] } containerPath - Where the parameters live in the ctx
 * instance (session,[request, body], etc.).
 *
 * @param { string[] } params - the names of the params to check.
 *
 * @param { function } validator (optional) - a function to validate the
 * parameters in question. If this is omitted, a simple presence check will
 * be performed.
 */
export default function validateParams(
  containerPath: string[],
  params: string[],
  validator?: (key: string, value: string) => boolean,
) {
  return async (ctx: IContext, next: () => Promise<any>) => {
    const container = _.get(ctx, containerPath)

    if (!container) {
      logger.warn(`Invalid param container: [${container}]`)
      ctx.res.badRequest(`request ${container} is required.`)
    }

    // terminate HTTP request processing and respond bad request if validate fail
    for (const param of params) {
      if (!container[param]) {
        ctx.res.badRequest(`${param} is required.`)
        return
      }

      if (validator && !validator(param, container[param])) {
        ctx.res.badRequest(`${param} is invalid.`)
        return
      }
    }
    await next()
  }
}
