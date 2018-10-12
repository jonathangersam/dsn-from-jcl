const { extractFromString, extractFromFile } = require('../index')

const INPUT_FILE = './spec/input.txt'

xdescribe('extractFromString()', () => {
  it('should return the matching DSN part from a JCL line', () => {
    expect(extractFromString('//INFILE DD DSN=TZSP.THE.QUICK.BROWN.FOX,DISP=SHR', 'TZSP')).toEqual(['TZSP.THE.QUICK.BROWN.FOX'])
  })

  it('should return nulls for JCL lines without match', () => {
    expect(extractFromString('DSN=TZSP.SOME.FILE\nDISP=SHR', 'TZSP')).toEqual(['TZSP.SOME.FILE', null])
  })
})

describe('extractFromFile()', () => {
  it('should return the matching DSN parts from a given input file', () => {
    expect(extractFromFile(INPUT_FILE, 'TZSP')).toEqual(['TZSP.SOME.FILE', null, 'TZSP.EXTRA.FILE.HERE'])
  })
})
/*
// test extracting from given string
assert.equal(extractFromString('//INFILE DD DSN=TZSP.THE.QUICK.BROWN.FOX,DISP=SHR', 'TZSP')[0], 'TZSP.THE.QUICK.BROWN.FOX')
assert.equal(extractFromString('//INFILE DD DISP=SHR,', 'TZSP')[0], null)

// test extractig from file
assert(r.equals(extractFromFile(INPUT_FILE, 'TZSP'), ['TZSP.SOME.FILE', null]))

console.log('SUCCESS')


describe('Booleans', () => {
  it('should evaluate 1 as true', () => {
    expect(true).toBe(1)
  })
})
*/