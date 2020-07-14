import { bold, gray, blue, green, yellow, red } from 'kleur'

export default class {
    logLevel: LogLevel
    color: boolean

    constructor(logLevel: LogLevel = LogLevel.Standard, color: boolean = true) {
        this.logLevel = logLevel
        this.color = color
    }

    private print(string: string, type: string, color: (string: string) => string, output: (string: string) => void) {
        const strings = string.split('\n')

        output(`${this.color ? color(bold(type)) : type} ${strings.shift()}`)
        strings.forEach(line => output(`      ${line}`))
    }

    createBox(strings: string[]): string {
        const lineLength = Math.max(...strings.map(string => string.length))
        const topAndBottom = `+${'-'.repeat(lineLength + 2)}+`

        return (
            `${topAndBottom}\n` +
            `${strings.map(string => `| ${string}${' '.repeat(lineLength - string.length)} |`).join('\n')}\n` +
            `${topAndBottom}`
        )
    }

    debug(string: string): void {
        if (this.logLevel >= LogLevel.Debug) this.print(string, 'DEBUG', gray, console.log)
    }

    info(string: string): void {
        if (this.logLevel >= LogLevel.Standard) this.print(string, 'INFO ', blue, console.log)
    }

    done(string: string): void {
        if (this.logLevel >= LogLevel.Standard) this.print(string, 'DONE ', green, console.log)
    }

    warn(string: string): void {
        if (this.logLevel >= LogLevel.Standard) this.print(string, 'WARN ', yellow, console.warn)
    }

    error(string: string): void {
        if (this.logLevel >= LogLevel.Quiet) this.print(string, 'ERROR', red, console.error)
    }
}

export enum LogLevel {
    Quiet = 0,
    Standard,
    Debug
}