const fs = require('fs')
const os = require('os')

const INPUT_PATH = './input.txt'
const OUTPUT_PATH = './output.txt'
const FIRST_QUALIFIER = 'TZSP' // make dynamic

const replace = `${FIRST_QUALIFIER}\\.[\\.A-Z0-9]+`
const re = new RegExp(replace)

const raw = fs.readFileSync(INPUT_PATH, {encoding: 'utf8'})

const dsns = raw.split(os.EOL)
  .map(line => {
    const maybeMatch = line.match(re)
    return maybeMatch ? maybeMatch[0] : 'NA'
  })

console.log(dsns)

fs.writeFileSync(OUTPUT_PATH, dsns.join(os.EOL))