const fs = require('fs')
const os = require('os')
const readline = require('readline')
const { extractFromFile } = require('./')

const consoleReader = getConsoleReader()

main()

function main() {
  console.log('*** EXTRACT DSN FROM JCL, INTERACTIVE MODE ***')

  consoleReader.question('1) Your input file path? > ', inputPath => {
    checkIfFileExistsOtherwiseTerminate(inputPath)

    consoleReader.question('2) Your output path? > ', outputPath => {

      consoleReader.question('3) First DSN qualifier to search for? > ', searchQualifier => {
        extractDsnsAndWriteToFileOnErrorTerminate(inputPath, outputPath, searchQualifier)
        process.exit(0)
      })
    })
  })
}

function getConsoleReader() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
}

function checkIfFileExistsOtherwiseTerminate(filepath) {
  try {
    fs.statSync(filepath)
  } catch (e) {
    console.error(`FAIL: couldn't locate ${filepath}`, e)
    process.exit(1)
  }
}

function extractDsnsAndWriteToFileOnErrorTerminate(inputPath, outputPath, qualifier) {
  try {
    const dsns = extractFromFile(inputPath, qualifier)
    console.log('OK: Extracted DSNs are:', dsns)

    fs.writeFileSync(outputPath, dsns.join(os.EOL))
    console.log('OK: Output saved to', outputPath)
  } catch (e) {
    console.error(`FAILED to extract dsns and write to output file`, e)
    process.exit(1)
  }
}
