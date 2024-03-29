/* Inspired by https://github.com/isaacs/color-support

   The ISC License

   Copyright (c) Isaac Z. Schlueter and Contributors

   Permission to use, copy, modify, and/or distribute this software for any
   purpose with or without fee is hereby granted, provided that the above
   copyright notice and this permission notice appear in all copies.

   THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR
   IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE. */

export default (): boolean => {
    const env = process.env
    const term = env.TERM || ''

    if (
        typeof process === 'undefined' || !process ||
        !process.stdout || !process.env ||
        !process.platform || process.platform === 'win32' ||
        (term === 'dumb' && !env.COLORTERM) || !process.stdout.isTTY
    ) return false

    if (env.CI || env.TEAMCITY_VERSION) return !!env.TRAVIS

    if (
        env.COLORTERM || env.TMUX || /^screen|^xterm(-256)?|^vt100|color|ansi|cygwin|linux/i.test(term)
    ) return true

    return false
}
