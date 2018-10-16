const fs = require('fs')
const os = require('os')
const { extractFromFile } = require('./')
const readline = require('readline')

main()

function main() {
  const consoleReader = getConsoleReader()

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
    logErrorAndTerminate(`FAIL: couldn't locate ${filepath}`, e)
  }
}

function logErrorAndTerminate(msg, err) {
  console.error(msg, err)
  process.exit(1)
}

function extractDsnsAndWriteToFileOnErrorTerminate(inputPath, outputPath, qualifier) {
  try {
    const dsns = tryExtractDsnsFromFile(inputPath, qualifier)
    tryWriteDsnsToFile(outputPath, dsns)
  } catch (e) {
    logErrorAndTerminate(`FAILED to extract dsns and write to output file`, e)
  }
}

function tryExtractDsnsFromFile(inputPath, qualifier) {
  const dsns = extractFromFile(inputPath, qualifier)
  console.log('OK: Extracted DSNs are:', dsns)
  return dsns
}

function tryWriteDsnsToFile(outputPath, dsns) {
  fs.writeFileSync(outputPath, dsns.join(os.EOL))
  console.log('OK: Output saved to', outputPath)
}
