const fs = require('fs')
const os = require('os')
const { extractFromFile } = require('./')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const userInput = {
  inputPath: '',
  outputPath: '',
  qualifier: '',
}

console.log('*** EXTRACT DSN FROM JCL, INTERACTIVE MODE ***')
rl.question('1) your input file path? > ', input => {
  userInput.inputPath = input
  try {
    fs.statSync(input)
  } catch (e) {
    console.error(`FAIL couldn't find that file` )
    process.exit(1)
  }

  rl.question('2) your output path?> ', input => {
    userInput.outputPath = input

    rl.question('3) 1st DSN qualifier to search for? > ', input => {
      userInput.qualifier = input
      const { inputPath, outputPath } = userInput
      extractDSNToFile(inputPath, outputPath, input)
      process.exit(0)
    })
  })
})

function extractDSNToFile(input, output, qualifier) {
  const dsns = extractFromFile(input, qualifier)
  console.log('RESULT:\n', dsns)
  fs.writeFileSync(output, dsns.join(os.EOL))
}

// rl.on('line', input => console.log('you said', input))
