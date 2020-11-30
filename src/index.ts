import { bold, gray, blue, green, yellow, red } from 'ansi-colors'
import colorSupported from './colorSupported'

interface LogOptions {
    color?: boolean,
    bold?: boolean,
    maxTypeLength?: number
}

export default class {
    public logLevel: LogLevel
    public color: boolean
    public bold: boolean
    public maxTypeLength: number

    constructor(logLevel: LogLevel = LogLevel.Standard, options?: LogOptions) {
        this.logLevel = logLevel

        this.color = options?.color ?? colorSupported()
        this.bold = options?.bold ?? this.color

        this.maxTypeLength = options?.maxTypeLength || 5
    }

    protected print(string: string, type: string, color: (string: string) => string, output: (string: string) => void) {
        const strings = string.split('\n')

        // Output the first line
        output(`${this.color ? color( this.bold ? bold(type) : type ) : type}${' '.repeat(this.maxTypeLength - type.length)} ${strings.shift()}`)
        // Output the rest of the lines
        strings.forEach(line => output(`${' '.repeat(this.maxTypeLength + 1)}${line}`))
    }

    public table(strings: string | string[]): string {
        if (typeof strings == 'string') strings = [ strings ]

        const lineLength = Math.max(
            ...strings
                .map(string =>
                    string
                        .split('\n')
                        .map(line => line.length)
                )
                .reduce((a, b) => [ ...a, ...b ])
        )
        const horizontalLine = `+${'-'.repeat(lineLength + 2)}+`

        const lines = strings.map(string =>
            string
                .split('\n')
                .map(line => `| ${line}${' '.repeat(lineLength - line.length)} |`)
                .join('\n')
        )

        return `${horizontalLine}\n${lines.join(`\n${horizontalLine}\n`)}\n${horizontalLine}`
    }

    public blank(string: string): void {
        if (this.logLevel >= LogLevel.Debug) this.print(string, '', (string: string) => string, console.log)
    }

    public debug(string: string): void {
        if (this.logLevel >= LogLevel.Debug) this.print(string, 'DEBUG', gray, console.log)
    }

    public info(string: string): void {
        if (this.logLevel >= LogLevel.Standard) this.print(string, 'INFO ', blue, console.log)
    }

    public done(string: string): void {
        if (this.logLevel >= LogLevel.Standard) this.print(string, 'DONE ', green, console.log)
    }

    public warn(string: string): void {
        if (this.logLevel >= LogLevel.Standard) this.print(string, 'WARN ', yellow, console.warn)
    }

    public error(string: string): void {
        if (this.logLevel >= LogLevel.Quiet) this.print(string, 'ERROR', red, console.error)
    }
}

export enum LogLevel {
    Quiet = 0,
    Standard,
    Debug
}