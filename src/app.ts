import childProcess from 'child_process'
import Koa from 'koa'
import helmet from 'koa-helmet'
import compose from 'koa-compose'
import bodyParser from 'koa-bodyparser'
import logger from '@/services/logger'
import httpReceiveLogger from '@/middlewares/httpReceiveLogger'
import responseHandler from '@/middlewares/responseHandler'
import errorHandler from '@/middlewares/errorHandler'
import api from '@/routes'
import Config from '@/config'
import { IContext } from '@/@types/types'

const App = new Koa()

// use middlewares
const middlewares = compose<IContext>([
  errorHandler as compose.Middleware<IContext>,
  httpReceiveLogger as compose.Middleware<IContext>,
  bodyParser() as compose.Middleware<IContext>,
  helmet(),
  responseHandler,
  api.routes(),
  api.allowedMethods(),
])
App.use(middlewares as compose.Middleware<Koa.Context>)

// boostrap server
const PORT = process.env.NODE_PORT || Config.get('APP_PORT')
const server = App.listen(PORT, () => {
  logger.info(
    `
      APP: Node API Boilerplate,
      PORT: ${PORT},
      ENV: ${process.env.NODE_ENV},
      LOG_LEVEL: ${Config.get('APP_LOG_LEVEL')},
      NODE_VERSION: ${process.version},
      YARN_VERSION: ${childProcess.execSync('yarn -v')}
    `,
  )
})

// error handler
function onError(error: any) {
  logger.error(`Application error! ${error}`)
}
server.on('error', onError)
App.on('error', onError)

export default App
