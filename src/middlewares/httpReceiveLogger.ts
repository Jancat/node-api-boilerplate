import { httpLogger } from '@/services/httpLogger'
import { IContext } from '@/@types/types'

export default async function httpReceiveLogger(ctx: IContext, next: () => Promise<any>) {
  const startTime: number = Date.now()
  await next()
  const endTime: number = Date.now()
  const responseTime: string = `${endTime - startTime} ms`
  httpLogger.logReceivedRequest(ctx, responseTime)
}
