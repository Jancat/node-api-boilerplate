process.env.NODE_CONFIG_DIR = './src/config/'
import config from 'config'
import logger from '@/services/logger'

export default {
  get(env: string): string | undefined {
    try {
      if (process.env.NODE_ENV === 'development') {
        return config.get(env)
      }
      return process.env[env] || config.get(env)
    } catch (error) {
      logger.warn(`Get ${env} fail.`)
      return undefined
    }
  },

  has(env: string): boolean {
    if (process.env.NODE_ENV === 'development') {
      return config.has(env)
    }
    return !!process.env[env]
  },
}
