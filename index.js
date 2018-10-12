const fs = require('fs')

function extractFromString(text, qualifier, opt) {
  const replace = `${qualifier}\\.[\\.A-Z0-9]+`
  const re = new RegExp(replace)

  return text.split('\n')
    .map(line => {
      const maybeMatch = line.match(re)
      console.log({maybeMatch})
      return maybeMatch ? maybeMatch[0] : null
    })
}

function extractFromFile(filepath, qualifier, opt) {
  const raw = fs.readFileSync(filepath, {encoding: 'utf8'})
    .replace(/\r/g, '\n') // in case user changed encoding from os.EOL to something else, change Windows CRLF line-endings to more generic '\n'

  return extractFromString(raw, qualifier, opt)
}

module.exports = {
  extractFromString,
  extractFromFile,
}