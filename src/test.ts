// Load Log75
import Log75, { LogLevel } from './index'

// Add custom message type
import { magenta } from 'ansi-colors'
class Log76 extends Log75 {
    custom(string: string): void {
        if (this.logLevel >= LogLevel.Quiet) super.print(string, 'CUSTOM', magenta, console.warn)
    }
}

let logger = new Log76(LogLevel.Debug, { maxTypeLength: 6 })

logger.debug('You should')
logger.done('use Log75')
logger.info('to log')
logger.warn('cool messages')
logger.error('in the console!\n')

logger.info(
    logger.table(
        'You can make\n' +
        'cool tables!'
    )
)

logger.table([
    'And ones with',
    'a separator',
], 'done')

logger.table({
    'And objects': 'can work',
    'too!': 123,
    yes: [ true, false, "sus", 123 ],
}, 'warn')

logger.blank('')
logger.custom('This is a custom message type\n')

import colorSupported from './colorSupported'
logger.info(`Automatic detection thinks that this terminal ${colorSupported() ? 'supports' : 'doesn\'t support'} color`)

logger.blank('')
logger.color = false
logger.done('Color is now disabled')
logger.color = colorSupported()

logger.bold = false
logger.info('Bold is now disabled\n')
logger.bold = true

logger.inverted = true
logger.bold = false
logger.debug('Colors')
logger.done('Are')
logger.info('now')
logger.warn('inverted!')
logger.bold = true
logger.error('Looks bad with bold\n')
logger.inverted = false

logger.logLevel = LogLevel.Standard
logger.debug('This message should NOT be printed')
logger.done('The log level is now standard')

logger.logLevel = LogLevel.Quiet
logger.debug('This message should NOT be printed')
logger.error('The log level is now quiet')
