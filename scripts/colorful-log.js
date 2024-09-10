/**
 * @param {string} msg
 * @param {any[]} args
 */
export function info(msg, ...args) {
  console.log(COLORS.FgBlue + msg, ...args)
}

/**
 * @param {string} msg
 * @param {any[]} args
 */
export function error(msg, ...args) {
  console.log(COLORS.FgRed + msg, ...args)
}

/**
 * @param {string} msg
 * @param {any[]} args
 */
export function warning(msg, ...args) {
  console.log(COLORS.FgYellow + msg, ...args)
}

/**
 * @param {string} msg
 * @param {any[]} args
 */
export function success(msg, ...args) {
  console.log(COLORS.FgGreen + msg, ...args)
}

/** @type {Record<string, string>} */
const COLORS = {
  Reset: '\x1b[0m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
}
