import koaRouter from 'koa-router'
import { demo, error, errorWithoutMessage } from '@/routes/demo/demo.controller'
import validateParams from '@/middlewares/validateParams'

const match = (regex: RegExp) => (term: string): boolean => regex.test(term)

/**
 * A simple module to demonstrate declarative parameter validation.
 */
const demoRouter = new koaRouter()
  .get('/foo-is-required', validateParams(['query'], ['foo']) as koaRouter.IMiddleware, demo)
  .get(
    '/foo-must-be-numeric',
    validateParams(['query'], ['foo'], match(/^[0-9]*$/)) as koaRouter.IMiddleware,
    demo,
  )
  .post(
    '/body-must-have-foo-with-bar',
    validateParams(['request', 'body', 'foo'], ['bar']) as koaRouter.IMiddleware,
    demo,
  )
  .get('/error', error)
  .get('/error-without-message', errorWithoutMessage)

export default demoRouter
