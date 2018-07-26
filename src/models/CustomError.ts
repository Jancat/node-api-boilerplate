import { UNKNOWN_ERROR } from '@/constants/error'

export default class CustomError extends Error {
  constructor(
    public type: string = UNKNOWN_ERROR.type,
    public message: string = UNKNOWN_ERROR.message,
    public code?: string,
  ) {
    super(message)
    this.type = type
    this.code = code
    this.message = message
  }
}
