const fs = require('fs')
const os = require('os')
const STANDARD_LINE_BREAK = '\n'

const lineEndPattern = new RegExp(`${os.EOL}`, 'g')

/***
 * getDsnsFromFile returns an array of DSNs that start with the given qualifier
 * @param inputPath {String} path to file on disk
 * @param dsnQualifier {String} 1st qualifier for DSN pattern matching
 * @param opt {Object} options object
 * @returns {String[]} valid DSNs per line
 */
function getDsnsFromFile(inputPath, dsnQualifier, opt) {
  const fileContents = tryLoadingFileContents(inputPath)
  const standardizedFileContents = fileContents.replace(lineEndPattern, STANDARD_LINE_BREAK)
  return getDsnsFromString(standardizedFileContents, dsnQualifier, opt)
}

/***
 * getDsnsFromString returns an array of DSNs that start with the given qualifier
 * @param text {String}
 * @param dsnQualifier {String} 1st qualifier for DSN pattern matching
 * @param opt {Object} options object
 * @returns {String[]} valid DSNs per line
 */
function getDsnsFromString(text, dsnQualifier, opt) {
  const dsnPattern = getDsnRegex(dsnQualifier)
  const lines = text.split(STANDARD_LINE_BREAK)
  const dsns = lines.map(line => getPatternMatchOrDefault(line, dsnPattern, null))
  return dsns
}

function tryLoadingFileContents(inputPath) {
  try {
    return fs.readFileSync(inputPath, {encoding: 'utf8'})
  } catch(e) {
    throw new Error(`FAILED reading ${inputPath}; ` + e.toString())
  }
}

function getDsnRegex(dsnQualifier) {
  return new RegExp(`${dsnQualifier}\\.[\.A-Z0-9]+`)
}

function getPatternMatchOrDefault(line, regexPattern, defaultValue) {
  const maybeMatch = line.match(regexPattern)
  return maybeMatch ? maybeMatch[0] : defaultValue
}

module.exports = {
  extractFromString: getDsnsFromString,
  extractFromFile: getDsnsFromFile,
}