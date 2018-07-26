import Router from 'koa-router'
import rootRouter from '@/routes/root/root.routes'
import demoRouter from '@/routes/demo/demo.routes'

// top api routes
const api = new Router()
  .use('/', rootRouter.routes())
  .use('/demo', demoRouter.routes(), demoRouter.allowedMethods())

export default api
