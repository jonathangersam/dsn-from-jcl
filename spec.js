const assert = require('assert')
const r = require('ramda')
const { extractFromString, extractFromFile } = require('./index')

const INPUT_FILE = './test_resources/input.txt'

// test extracting from given string
assert.equal(extractFromString('//INFILE DD DSN=TZSP.THE.QUICK.BROWN.FOX,DISP=SHR', 'TZSP')[0], 'TZSP.THE.QUICK.BROWN.FOX')
assert.equal(extractFromString('//INFILE DD DISP=SHR,', 'TZSP')[0], null)

// test extractig from file
assert(r.equals(extractFromFile(INPUT_FILE, 'TZSP'), ['TZSP.SOME.FILE', null]))

console.log('SUCCESS')
