const fs = require('fs')
const os = require('os')
const { extractFromFile } = require('./')

const INPUT_PATH = './test_resources/input.txt'
const OUTPUT_PATH = './test_resources/output.txt'
const FIRST_QUALIFIER = 'TZSP' // make dynamic

const dsns = extractFromFile(INPUT_PATH, FIRST_QUALIFIER)

console.log('RESULT:\n', dsns)

fs.writeFileSync(OUTPUT_PATH, dsns.join(os.EOL))