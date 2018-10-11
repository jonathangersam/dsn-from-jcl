const os = require('os')
const fs = require('fs')

function extractFromString(text, qualifier, opt) {
  const replace = `${qualifier}\\.[\\.A-Z0-9]+`
  const re = new RegExp(replace)

  return text.split(os.EOL)
    .map(line => {
      const maybeMatch = line.match(re)
      return maybeMatch ? maybeMatch[0] : null
    })
}

function extractFromFile(filepath, qualifier, opt) {
  const replace = `${qualifier}\\.[\\.A-Z0-9]+`
  const re = new RegExp(replace)

  const raw = fs.readFileSync(filepath, {encoding: 'utf8'})
  return raw.split(os.EOL)
    .map(line => {
      const maybeMatch = line.match(re)
      return maybeMatch ? maybeMatch[0] : null
    })
}

module.exports = {
  extractFromString,
  extractFromFile,
}