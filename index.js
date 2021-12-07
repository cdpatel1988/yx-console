// Import.
const fs = require('fs');

const defaultDirectory = 'logs/';
const defaultFileName = 'debug';
/**
 * Append zero to date.
 * @param {string} value 
 * @param {number} length 
 * @returns {string}
 */
function appendZero(value, length) {
    return `${value}`.padStart(length, '0');
}

/**
 * Get date as text.
 * @returns {string} Date in format. Sample: "2021/02/13, 01:32:12".
 */
function getDateInFormat() {
    const now = new Date();
    const nowText = appendZero(now.getUTCFullYear(), 4) + '/'
        + appendZero(now.getUTCMonth() + 1, 2) + '/'
        + appendZero(now.getUTCDate(), 2) + ', '
        + appendZero(now.getUTCHours(), 2) + ':'
        + appendZero(now.getUTCMinutes(), 2) + ':'
        + appendZero(now.getUTCSeconds(), 2);
    return nowText;
}
/**
 * log message with white color in the console
 * @param {string} message message or log that will be print on log and file
 * @param {bool} isShowInConsole will print message to colosole if status enable
 * @param {bool} isSaveTofile will save message to selected file if status enable
 * @param {string} fileNameWithoutExt log file name, default file name is 'debug.log'. file name without extension
 */
function log(message, isShowInConsole = true, isSaveTofile = true, fileNameWithoutExt = defaultFileName) {
    // Define log text.
    if (isShowInConsole)
        console.log(colours.fg.white, message, colours.reset)
    // console.log(message)
    if (isSaveTofile)
        store(message, fileNameWithoutExt + '.log')
}
/**
 * * log message with blue color in the console
 * @param {string} message message or log that will be print on log and file
 * @param {bool} isShowInConsole will print message to colosole if status enable
 * @param {bool} isSaveTofile will save message to selected file if status enable
 * @param {string} fileNameWithoutExt log file name, default file name is 'debug.log'. file name without extension
 */
const info = (message, isShowInConsole = true, isSaveTofile = true, fileNameWithoutExt = defaultFileName) => {
    if (isShowInConsole)
        console.info(colours.fg.blue, message, colours.reset)
    if (isSaveTofile)
        store(message, fileNameWithoutExt + '.log')
}
/**
 * log message with magenta color in the console
 * @param {string} message message or log that will be print on log and file
 * @param {bool} isShowInConsole will print message to colosole if status enable
 * @param {bool} isSaveTofile will save message to selected file if status enable
 * @param {string} fileNameWithoutExt log file name, default file name is 'debug.log'. file name without extension
 */
const warn = (message, isShowInConsole = true, isSaveTofile = true, fileNameWithoutExt = defaultFileName) => {
    if (isShowInConsole)
        console.warn(colours.fg.magenta, message, colours.reset);
    if (isSaveTofile)
        store(message, fileNameWithoutExt + '.log')
}

/**
 * log message with red color in the console
 * @param {string} message message or log that will be print on log and file
 * @param {bool} isShowInConsole will print message to colosole if status enable
 * @param {bool} isSaveTofile will save message to selected file if status enable
 * @param {string} fileNameWithoutExt log file name, default file name is 'debug.log'. file name without extension
 */
const error = (message, isShowInConsole = true, isSaveTofile = true, fileNameWithoutExt = defaultFileName) => {
    if (isShowInConsole)
        console.error(colours.fg.red, new Error(message));
    if (isSaveTofile)
        store(message, fileNameWithoutExt + '.log')
}

/**
 * Store message into the log file
 * @param {*} message 
 * @param {*} filename 
 */

function store(message, filename) {

    message = getDateInFormat() + ' =>> ' + message + '\n';

    const logDir = defaultDirectory;
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    // Save log to file.
    fs.appendFile(logDir + filename, message, 'utf8', function (error) {
        if (error) {
            // If error - show in console.
            console.log(getDateInFormat() + ' -> ' + error);
        }
    });
}
/**
 * Colors options for the log
 */
const colours = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        crimson: "\x1b[38m" // Scarlet
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        crimson: "\x1b[48m"
    }
};

// Export.
module.exports = {
    log,
    info,
    error,
    warn,
};
