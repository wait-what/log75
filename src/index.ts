import {
    bold,
    gray, blue, green, yellow, red,
    bgWhite, bgBlue, bgGreen, bgYellow, bgRed
} from 'ansi-colors'
import colorSupported from './colorSupported'

interface LogOptions {
    color?: boolean,
    bold?: boolean,
    inverted?: boolean,
    maxTypeLength?: number
}

export default class {
    public logLevel: LogLevel
    public color: boolean
    public bold: boolean
    public inverted: boolean
    public maxTypeLength: number

    constructor(logLevel: LogLevel = LogLevel.Standard, options?: LogOptions) {
        this.logLevel = logLevel

        this.color = options?.color ?? colorSupported()
        this.inverted = options?.inverted ?? false
        this.bold = options?.bold ?? (this.color && !this.inverted)

        this.maxTypeLength = options?.maxTypeLength || 5
    }

    protected print(string: string, type: string, color: (string: string) => string, output: (string: string) => void) {
        const strings = string.split('\n')

        const maxTypeLength = this.inverted ? this.maxTypeLength + 2 : this.maxTypeLength
        if (this.inverted) type = ` ${type} `

        let title = this.color ? (
            color( this.bold ? bold(type) : type )
        ) : type

        output(`${title}${' '.repeat(maxTypeLength - type.length)} ${strings.shift()}`)

        strings.forEach(line =>
            output(`${' '.repeat(maxTypeLength + 1)}${line}`)
        )
    }

    public table(input: string[] | string | object, logTo?: string): string {
        if (typeof input == 'object' && !Array.isArray(input)) {
            const maxKeyLength = Object.keys(input).reduce((max, key) => Math.max(max, key.length), 0)

            const output = []
            for (const key in input) {
                const value = (input as any)[key].toString()
                output.push(`${key}${' '.repeat(maxKeyLength - key.length)} | ${value}`)
            }

            input = output
        }

        if (typeof input == 'string') input = [ input ]

        const lineLength = Math.max(
            ...(input as string[])
                .map(string =>
                    string
                        .split('\n')
                        .map(line => line.length)
                )
                .reduce((a, b) => [ ...a, ...b ])
        )
        const horizontalLine = `+${'-'.repeat(lineLength + 2)}+`

        const lines = (input as string[]).map(string =>
            string
                .split('\n')
                .map(line => `| ${line}${' '.repeat(lineLength - line.length)} |`)
                .join('\n')
        )

        const output = `${horizontalLine}\n${lines.join(`\n${horizontalLine}\n`)}\n${horizontalLine}`

        logTo && (this as any)[logTo](output)

        return output
    }

    public blank(string: string): void {
        this.print(string, '', (string: string) => string, console.log)
    }

    public trace(string: string): void {
        if (this.logLevel >= LogLevel.Trace) this.print(string, 'TRACE', this.inverted ? bgWhite.black : gray, console.debug)
    }

    public debug(string: string): void {
        if (this.logLevel >= LogLevel.Debug) this.print(string, 'DEBUG', this.inverted ? bgWhite.black : gray, console.debug)
    }

    public info(string: string): void {
        if (this.logLevel >= LogLevel.Standard) this.print(string, 'INFO ', this.inverted ? bgBlue.black : blue, console.log)
    }

    public done(string: string): void {
        if (this.logLevel >= LogLevel.Standard) this.print(string, 'DONE ', this.inverted ? bgGreen.black : green, console.log)
    }

    public warn(string: string): void {
        if (this.logLevel >= LogLevel.Standard) this.print(string, 'WARN ', this.inverted ? bgYellow.black : yellow, console.warn)
    }

    public error(string: string): void {
        if (this.logLevel >= LogLevel.Quiet) this.print(string, 'ERROR', this.inverted ? bgRed.black : red, console.error)
    }
}

export enum LogLevel {
    Quiet = 0,
    Standard,
    Debug,
    Trace
}
