/**
 * Client Failures
 */
export const UNKNOWN_ENDPOINT = {
  type: 'UNKNOWN_ENDPOINT',
  message: 'The requested endpoint does not exist.',
}

export const INVALID_REQUEST = {
  type: 'INVALID_REQUEST',
  message: 'The request has invalid parameters.',
}

/**
 * Server Errors
 */
export const INTERNAL_ERROR = {
  type: 'INTERNAL_ERROR',
  message: 'The server encountered an internal error.',
}

export const UNKNOWN_ERROR = {
  type: 'UNKNOWN_ERROR',
  message: 'The server encountered an unknown error.',
}

export const CONFIG_ERROR = {
  type: 'CONFIG_ERROR',
  message: 'The server encountered an configuration error.',
}

export const WECHAT_ERROR = {
  type: 'WECHAT_ERROR',
}

export const REQUEST_ERROR = {
  type: 'REQUEST_ERROR',
}
