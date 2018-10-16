const { extractFromString, extractFromFile } = require('../index')
const INPUT_FILE = './spec/input.txt'

describe('extractFromString()', () => {
  it('should return the matching DSN part from a JCL line', () => {
    expect(extractFromString('//INFILE DD DSN=TZSP.THE.QUICK.BROWN.FOX,DISP=SHR', 'TZSP'))
      .toEqual(['TZSP.THE.QUICK.BROWN.FOX'])
  })

  it('should return nulls for JCL lines without match', () => {
    expect(extractFromString('DSN=TZSP.SOME.FILE\nDISP=SHR', 'TZSP'))
      .toEqual(['TZSP.SOME.FILE', null])
  })
})

describe('extractFromFile()', () => {
  it('should return the matching DSN parts from a given input file', () => {
    expect(extractFromFile(INPUT_FILE, 'TZSP'))
      .toEqual(['TZSP.SOME.FILE', null, 'TZSP.EXTRA.FILE.HERE'])
  })

  it('should throw error when given a missing file', () => {
    expect(() => extractFromFile('./NON/EXISTENT/FILE', 'TZSP'))
      .toThrowError()
  })
})