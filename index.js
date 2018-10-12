const fs = require('fs')
const os = require('os')

function extractFromString(text, qualifier, opt) {
  const replace = `${qualifier}\\.[\\.A-Z0-9]+`
  const re = new RegExp(replace)

  return text.split('\n')
    .map(line => {
      const maybeMatch = line.match(re)
      return maybeMatch ? maybeMatch[0] : null
    })
}

function extractFromFile(filepath, qualifier, opt) {
  const replace = `${os.EOL}`
  const re = new RegExp(replace, 'g')

  const raw = fs.readFileSync(filepath, {encoding: 'utf8'})
    .replace(re, '\n') // replace os-specific end-line chars with generic one

  return extractFromString(raw, qualifier, opt)
}

module.exports = {
  extractFromString,
  extractFromFile,
}