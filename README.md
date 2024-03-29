# Log75
[![MIT](https://flat.badgen.net/badge/License/MIT/blue)](https://github.com/wait-what/log75/-/blob/master/LICENSE)

Log75 is a lightweight and extensible `console.log` wrapper to organise logs

![PREVIEW](https://raw.githubusercontent.com/wait-what/log75/master/assets/preview.png)

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

Option        | Type    | Default  | Description
------------- | ------- | -------- | -----------
color         | boolean | (auto)   | Automatically detected
bold          | boolean | inverted | Automatically detected
inverted      | boolean | false    | Set manually
maxTypeLength | number  | 5        | See [Custom message types](#custom-message-types)

### Examples
`color` or `bold` to false

![PREVIEW](https://raw.githubusercontent.com/wait-what/log75/master/assets/options.png)

`inverted` set to true

![PREVIEW](https://raw.githubusercontent.com/wait-what/log75/master/assets/inverted-colors.png)

## Message types
There are 6 message types available out of the box:
- Blank
- Debug
- Done
- Info
- Warn
- Error

Take a look at the [log levels](#log-levels) to find out at which log level each message type is printed

## Custom message types
You can add custom message types by extending the class

> You do not need to manually install ansi-colors as it is a dependency of log75

**Typescript**
```ts
import { magenta, bgMagenta } from 'ansi-colors'

class Log76 extends Log75 {
    custom(string: string): void {
        if (this.logLevel >= LogLevel.Quiet)
            super.print(string, 'CUSTOM', this.inverted ? bgMagenta.black : magenta, console.warn)
    }
}
```

**Javascript**
```js
const { magenta, bgMagenta } = require('ansi-colors')

class Log76 extends Log75 {
    custom(string) {
        if (this.logLevel >= LogLevel.Quiet)
            super.print(string, 'CUSTOM', this.inverted ? bgMagenta.black : magenta, console.warn)
    }
}
```

> If your custom message type is longer than 5 characters, you will need to increase `maxTypeLength` in Log75's options. Set it to the length of your longest message type.

**Be sure to use your extended class!**

```js
// Note the Log76 here. You are using your extended version
const logger = new Log76(LogLevel.Debug, { maxTypeLength: 6 })

logger.custom('This is a custom message type')
```

![PREVIEW](https://raw.githubusercontent.com/wait-what/log75/master/assets/custom.png)

## Log levels
There are 4 log levels available

Type     | Value
-------- | -----
Quiet    |   0
Standard |   1
Debug    |   2
Trace    |   3

The higher the low level, the more message types will be printed.

Message | Quiet | Standard | Debug | Trace
------- | ----- | -------- | ----- | -----
Blank   |   +   |     +    |   +   |   +
Error   |   +   |     +    |   +   |   +
Done    |       |     +    |   +   |   +
Info    |       |     +    |   +   |   +
Warn    |       |     +    |   +   |   +
Debug   |       |          |   +   |   +
Trace   |       |          |       |   +

## Tables
Log75 can create neat looking tables for you!

```js
const table = logger.table(
    'You can make\n' +
    'cool tables!'
)

logger.info(table)
```

For your convenience, it is possible to specify where you want to log it by passing a second parameter.

This accomplishes the same result as the previous example.

```js
const table = logger.table(
    'You can make\ncool tables!',
    'info'
)
```

![PREVIEW](https://raw.githubusercontent.com/wait-what/log75/master/assets/table.png)

You can use a string array to have separators.

```js
logger.table([
    'And ones with',
    'a separator\nlonger than one line'
], 'info')
```

![PREVIEW](https://raw.githubusercontent.com/wait-what/log75/master/assets/table-with-separator.png)

You can also turn objects into tables:

```js
logger.table({
    'And objects': 'can work',
    'too!': 123,
    yes: [ true, false, "sus", 123 ],
}, 'warn')
```

![PREVIEW](https://raw.githubusercontent.com/wait-what/log75/master/assets/table-object.png)

## Possibly breaking changes
### v1 -> v2
- `logger.createBox()` has been renamed to `logger.table()`
- If you pass a string array to `logger.table()`, it will now have separators. Use `array.join('\n')` for old behavior
- The second parameter in the constructor is now an object rather than a boolean

### v2 -> v3
- Blank is now printed at every log level (unlikely to break anything)
- Debug now prints to `console.debug` instead of `console.log` (unlikely to break anything)

## License
This project is licensed under [MIT](https://github.com/wait-what/log75/-/blob/master/LICENSE)
