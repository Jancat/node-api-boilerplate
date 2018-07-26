import chalk from 'chalk'
import moment from 'moment'
import _ from 'lodash'
import { ILoggerFields, IContext } from '@/@types/types'

function httpLog(
  { separator, format }: { separator: string; format: string[] },
  { dateTime, action, host, method, href, url, path, status, responseTime, body }: ILoggerFields,
) {
  const statusColor = status! >= 400 ? 'redBright' : 'greenBright'

  // add style to the log
  const fieldsWithStyle: { [index: string]: any } = {
    dateTime: dateTime && chalk.gray(<string>dateTime),
    action,
    host: host && chalk.blueBright(<string>host),
    method: method && chalk.greenBright(<string>method),
    href: href && chalk.blueBright(<string>href),
    url: url && chalk.blueBright(<string>url),
    path: path && chalk.blueBright(<string>path),
    status: status && chalk[statusColor](status.toString()),
    responseTime,
    body: body && JSON.stringify(<string>body),
  }

  // splice logs to output
  let httpLogs = ''
  format.forEach((field, index) => {
    if (fieldsWithStyle[field]) {
      if (index > 0) {
        httpLogs += separator
      }
      httpLogs += fieldsWithStyle[field]
    }
  })

  console.log(httpLogs)
}

const defaultOptions = {
  separator: ' - ',
  format: ['action', 'method', 'url', 'status', 'responseTime', 'body'],
}

// format: ['dateTime', 'action', 'method', 'href', 'url', 'path', 'status', 'responseTime', 'body']
const httpLogger = {
  logReceivedRequest(ctx: IContext, responseTime: string, options?: object) {
    const logOptions = { ...defaultOptions, ...options }
    const logFormat = logOptions.format
    const logFields: ILoggerFields = {
      dateTime:
        logFormat.includes('dateTime') && chalk.gray(moment().format('YYYY-MM-DD HH:mm:ss')),
      action: logFormat.includes('action') && 'HTTP Receive',
      host: logFormat.includes('host') && ctx.request.host,
      method: logFormat.includes('method') && ctx.request.method,
      href: logFormat.includes('href') && ctx.request.href,
      url: logFormat.includes('url') && ctx.request.url,
      path: logFormat.includes('path') && ctx.request.path,
      status: logFormat.includes('status') && ctx.response.status,
      responseTime: logFormat.includes('responseTime') && responseTime,
      body:
        logFormat.includes('body') &&
        (_.isEmpty(ctx.request.body) ? undefined : JSON.stringify(ctx.request.body)),
    }

    httpLog(logOptions, logFields)
  },

  logSendRequest(fields: ILoggerFields, options: object): void {
    const logOptions = { ...defaultOptions, ...options }
    const logFormat = logOptions.format
    const logFields: ILoggerFields = {
      dateTime:
        logFormat.includes('dateTime') &&
        (fields.dateTime || moment().format('YYYY-MM-DD HH:mm:ss')),
      action: logFormat.includes('action') && 'HTTP Send',
      host: logFormat.includes('host') && fields.host,
      method: logFormat.includes('method') && fields.method,
      href: logFormat.includes('href') && fields.href,
      url: logFormat.includes('url') && fields.url,
      path: logFormat.includes('path') && fields.path,
      status: logFormat.includes('status') && fields.status,
      responseTime: logFormat.includes('responseTime') && fields.responseTime,
      body: logFormat.includes('body') && fields.body,
    }
    httpLog(logOptions, logFields)
  },
}

export { httpLogger, defaultOptions }
