import fetch, { Response } from 'node-fetch'
import querystring from 'querystring'
import _ from 'lodash'
import logger from '@/services/logger'
import { httpLogger, defaultOptions } from '@/services/httpLogger'
import CustomError from '@/models/CustomError'
import { REQUEST_ERROR } from '@/constants/error'
import { IRequestInit } from '@/@types/types'

export default async function request(
  baseURL: string = '',
  path: string,
  timeout: number = 5000,
  { method = 'GET', queries = {}, headers = {}, body = null, token, jwt }: IRequestInit = {
    method: 'GET',
    queries: {},
    headers: {},
    body: null,
  },
): Promise<Response> {
  const url: string = baseURL + path
  // add access_token in url queries to auth in the HomeServer
  if (token) {
    // eslint-disable-next-line no-param-reassign
    queries.access_token = token
  }
  const fullUrl: string = _.isEmpty(queries) ? url : `${url}?${querystring.stringify(queries)}`

  // internal servers token
  if (jwt) {
    // eslint-disable-next-line no-param-reassign
    headers.Authorization = `Bearer ${jwt}`
  }

  let jsonBody: string = ''
  if (method !== 'GET') {
    // eslint-disable-next-line no-param-reassign
    headers['Content-Type'] = 'application/json'
    jsonBody = body ? JSON.stringify(body) : ''
  }

  const start: number = Date.now()
  let response: Response
  try {
    response = await fetch(fullUrl, {
      method,
      headers,
      body: jsonBody,
      timeout,
    })
    if (!response.ok) {
      const result: any = await response.json()
      throw new CustomError(REQUEST_ERROR.type, result.error, result.errcode)
    }

    return response
  } catch (error) {
    if (!response!) {
      logger.error(
        `
        code: ${error.code}
        message: ${error.message}
      `.trim(),
      )
    }
    throw error
  } finally {
    if (response!) {
      const responseTime: string = `${Date.now() - start} ms`
      const logOptions: { format: string[] } = _.cloneDeep(defaultOptions)
      logOptions.format = logOptions.format
        .join(' ')
        .replace('url', 'href')
        .split(' ')
      httpLogger.logSendRequest(
        {
          method,
          href: fullUrl,
          status: response! && response!.status,
          responseTime,
          body: jsonBody,
        },
        logOptions,
      )
    }
  }
}
