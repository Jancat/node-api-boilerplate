import { INVALID_REQUEST } from '@/constants/error'
import _ from 'lodash'
import { IContext } from '@/@types/types'

/**
 * HTTP Status codes
 */
const statusCodes: { [key: string]: number } = {
  CONTINUE: 100,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIME_OUT: 504,
}

export default async function responseHandler(ctx: IContext, next: () => Promise<any>) {
  ctx.res.success = (message = null) => {
    ctx.status = ctx.status < 400 ? ctx.status : statusCodes.OK
    ctx.body = _.isObject(message) ? message : { status: 'success', message }
  }

  ctx.res.fail = (type = null, message = null) => {
    ctx.status = ctx.status >= 400 && ctx.status < 500 ? ctx.status : statusCodes.BAD_REQUEST
    ctx.body = { status: 'fail', type, message }
  }

  ctx.res.error = (type = null, message = null) => {
    ctx.status = ctx.status < 500 ? statusCodes.INTERNAL_SERVER_ERROR : ctx.status
    ctx.body = { status: 'error', type, message }
  }

  ctx.res.ok = (message: string) => {
    ctx.status = statusCodes.OK
    ctx.res.success(message)
  }

  ctx.res.created = (message: string) => {
    ctx.status = statusCodes.CREATED
    ctx.res.success(message)
  }

  ctx.res.accepted = (message: string) => {
    ctx.status = statusCodes.ACCEPTED
    ctx.res.success(message)
  }

  ctx.res.noContent = (message: string) => {
    ctx.status = statusCodes.NO_CONTENT
    ctx.res.success(message)
  }

  ctx.res.badRequest = (message, type = INVALID_REQUEST.type) => {
    ctx.status = statusCodes.BAD_REQUEST
    ctx.res.fail(type, message)
  }

  ctx.res.forbidden = (type, message) => {
    ctx.status = statusCodes.FORBIDDEN
    ctx.res.fail(type, message)
  }

  ctx.res.notFound = (type, message) => {
    ctx.status = statusCodes.NOT_FOUND
    ctx.res.fail(type, message)
  }

  ctx.res.requestTimeout = (type, message) => {
    ctx.status = statusCodes.REQUEST_TIMEOUT
    ctx.res.fail(type, message)
  }

  ctx.res.unprocessableEntity = (type, message) => {
    ctx.status = statusCodes.UNPROCESSABLE_ENTITY
    ctx.res.fail(type, message)
  }

  ctx.res.internalServerError = (type, message) => {
    ctx.status = statusCodes.INTERNAL_SERVER_ERROR
    ctx.res.error(type, message)
  }

  ctx.res.notImplemented = (type, message) => {
    ctx.status = statusCodes.NOT_IMPLEMENTED
    ctx.res.error(type, message)
  }

  ctx.res.badGateway = (type, message) => {
    ctx.status = statusCodes.BAD_GATEWAY
    ctx.res.error(type, message)
  }

  ctx.res.serviceUnavailable = (type, message) => {
    ctx.status = statusCodes.SERVICE_UNAVAILABLE
    ctx.res.error(type, message)
  }

  ctx.res.gatewayTimeOut = (type, message) => {
    ctx.status = statusCodes.GATEWAY_TIME_OUT
    ctx.res.error(type, message)
  }
  await next()
}
