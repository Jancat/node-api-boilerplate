import koaRouter from 'koa-router'
import { root } from '@/routes/root/root.controller'

/**
 * Root routes: just return the API name.
 */
const rootRouter: koaRouter = new koaRouter().get('/', root)

export default rootRouter
