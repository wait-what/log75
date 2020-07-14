import Log75 from './index'
import { LogLevel } from './index'

let logger = new Log75(LogLevel.Debug)

logger.debug('This message should be printed')
logger.done('This message should be printed')
logger.info('This message should be printed')
logger.warn('This message should be printed')
logger.error('This message should be printed')

logger.done(
    logger.createBox([
        'This should be',
        'in a',
        'box'
    ])
)

logger.logLevel = LogLevel.Standard
logger.debug('This message should NOT be printed')
logger.done('This message should be printed')

logger.logLevel = LogLevel.Quiet
logger.debug('This message should NOT be printed')
logger.error('This message should be printed')

logger.logLevel = LogLevel.Standard
logger.color = false
logger.done('This message should be printed WITHOUT COLOR, even if the terminal supports it')

console.log('\n\n')
logger.logLevel = LogLevel.Debug
logger.color = true
logger.debug('You should')
logger.done('use Log75')
logger.info('to log')
logger.warn('cool messages')
logger.error('in the console!')
console.log('\n\n')