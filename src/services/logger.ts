import winston from 'winston'
import moment from 'moment'
import chalk from 'chalk'
import Config from '@/config'

const { combine, splat, simple } = winston.format

const logBgHex: string = '#DBEEFF'
const logStyle: { [index: string]: string } = {
  INFO: chalk.grey.bgHex(logBgHex)(' INFO '),
  WARN: chalk.hex('#f5720a').bgHex(logBgHex)(' WARN '),
  ERROR: chalk.hex('#cf000f').bgHex(logBgHex)(' ERROR '),
}
const customFormat = winston.format(info => {
  /* eslint-disable no-param-reassign */
  if (process.env.NODE_ENV === 'development') {
    // Rancher output the logs with time automatically
    info.time = moment().format('YYYY-MM-DD HH:mm:ss')
  }
  const upperCaseLevel = info.level.toUpperCase()
  info.level = logStyle[upperCaseLevel]
  /* eslint-enable no-param-reassign */

  return info
})

export default winston.createLogger({
  // maximum level of messages that a transport should log
  level: Config.get('APP_LOG_LEVEL'),
  transports: [new winston.transports.Console()],
  format: combine(splat(), customFormat(), simple()),
})
