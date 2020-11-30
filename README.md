# Log75
[![MIT](https://flat.badgen.net/badge/License/MIT/blue)](https://gitlab.com/Wait_What_/log75/-/blob/master/LICENSE.md)
[![NODE](https://flat.badgen.net/badge/Language/Node.js/green?icon=node)](https://nodejs.org/en/)
[![SUPPORTSERVER](https://flat.badgen.net/badge/Support%20server/Join/purple)](https://discord.gg/N8Fqcuk)

Log75 is a convenient, lightweight and customizable logging utility for Node.js

[![PREVIEW](https://gitlab.com/Wait_What_/log75/-/raw/master/assets/preview.png)]()

## Importing the module
**Typescript**
```ts
import Log75, { LogLevel } from 'log75'
```
**Javascript**
```js
const { default: Log75, LogLevel } = require('log75')
```

## Basic usage
```js
const logger = new Log75(LogLevel.Standard)

logger.info('This is a message')
```

## Options
You can pass options to Log75 as the second parameter of the constructor
```js
const logger = new Log75(LogLevel.Standard, {
    color: true
})
```
Option        | Type    | Default | Description
------------- | ------- | ------- | -----------
color         | boolean | (auto)  | Automatically detected
bold          | boolean | (auto)  | Automatically detected
maxTypeLength | number  | 5       | See [Custom message types](#custom-message-types)

This is what happens when you set `color` or `bold` to false

[![PREVIEW](https://gitlab.com/Wait_What_/log75/-/raw/master/assets/options.png)]()

## Message types
There are 6 message types available out of the box:
- Blank
- Debug
- Done
- Info
- Warn
- Error

See [Log levels](#log-levels) to find out at which log level each type is printed

## Custom message types
You can add custom message types by extending the class

> You do not need to manually install ansi-colors as it is a dependency of log75

**Typescript**
```ts
import { magenta } from 'ansi-colors'
class Log76 extends Log75 {
    custom(string: string): void {
        if (this.logLevel >= LogLevel.Quiet)
            super.print(string, 'CUSTOM', magenta, console.warn)
    }
}
```
**Javascript**
```js
const { magenta } = require('ansi-colors')
class Log76 extends Log75 {
    custom(string) {
        if (this.logLevel >= LogLevel.Quiet)
            super.print(string, 'CUSTOM', magenta, console.warn)
    }
}
```

If your custom message type is longer than 5 characters, you will need to increase `maxTypeLength` in Log75's options. Set it to the length of your longest message type.

And be sure to use your extended class!

```js
const logger = new Log76(LogLevel.Debug, { maxTypeLength: 6 })
logger.custom('This is a custom message type')
```

[![PREVIEW](https://gitlab.com/Wait_What_/log75/-/raw/master/assets/custom.png)]()

## Log levels
There are 3 log levels by default

Type     | Value
-------- | -----
Quiet    |   0
Standard |   1
Debug    |   2

The higher the low level, the more message types will be printed.

Message | Quiet | Standard | Debug
------- | ----- | -------- | -----
Error   |   +   |     +    |   +
Done    |       |     +    |   +
Info    |       |     +    |   +
Warn    |       |     +    |   +
Debug   |       |          |   +
Blank   |       |          |   +

## Tables
Log75 can create neat looking tables for you!

Use `logger.createBox(string)` to create your box. This function does not output the message, you must do that yourself.

```js
logger.info(
    logger.createBox(
        'You can make\n' +
        'cool tables!'
    )
)
```

[![PREVIEW](https://gitlab.com/Wait_What_/log75/-/raw/master/assets/table.png)]()

You can use a string array to have separators.

```js
logger.info(
    logger.createBox([
        'And ones with',
        'a separator'
    ])
)
```

[![PREVIEW](https://gitlab.com/Wait_What_/log75/-/raw/master/assets/table-with-separator.png)]()

## Possibly breaking changes
### v1 -> v2
- `logger.createBox()` has been renamed to `logger.table()`
- If you pass a string array to `logger.table()`, it will now have separators. Use `array.join('\n')` for old behavior
- The second parameter in the constructor is now an object rather than a boolean
- `kleur` has been replaced with `ansi-colors`

## License
This project is licensed under [MIT](https://gitlab.com/Wait_What_/log75/-/blob/master/LICENSE.md)