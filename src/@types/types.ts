import { Context, Request } from 'koa'
import { ServerResponse } from 'http'

export interface ILoggerFields {
  dateTime?: string | boolean
  action?: string | boolean
  method?: string | boolean
  href?: string | boolean
  url?: string | boolean
  path?: string | boolean
  host?: string | boolean
  status?: number | boolean
  responseTime?: string | boolean
  body?: any
}

export interface IResponse extends ServerResponse {
  success(message: string | null): void
  fail(type: string | null, message: string | null): void
  error(type: string | null, message: string | null): void
  ok(message: any): void
  created(message: string): void
  accepted(message: string): void
  noContent(message: string): void
  badRequest(message: string): void
  forbidden(type: string, message: string): void
  notFound(type: string, message: string): void
  requestTimeout(type: string, message: string): void
  unprocessableEntity(type: string, message: string): void
  internalServerError(type: string, message: string): void
  notImplemented(type: string, message: string): void
  badGateway(type: string, message: string): void
  serviceUnavailable(type: string, message: string): void
  gatewayTimeOut(type: string, message: string): void
}

interface IRequest extends Request {
  body: any
}

export interface IContext extends Context {
  res: IResponse
  request: IRequest
}

export interface IRequestInit {
  method?: string
  headers?: { [key: string]: string }
  queries?: { [key: string]: string }
  body?: null | object | string
  token?: string
  jwt?: string
}
