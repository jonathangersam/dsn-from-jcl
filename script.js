const fs = require('fs')
const stream = require('stream')

const INPUT_PATH = './input.txt'
const OUTPUT_PATH = './output.txt'

const instream = fs.createReadStream(INPUT_PATH, {encoding: 'utf8'})
const outstream = fs.createWriteStream(OUTPUT_PATH, {encoding: 'utf8'})

// instream.on('data', chunk => {console.log(chunk)})

class LowercaseTransformer extends stream.Transform {
  constructor(options){
    super(options)
  }
  _transform(chunk, encoding, cb) {
    const upperChunk = chunk.toString().toLowerCase()
    console.log("***", upperChunk, '***')
    this.push(upperChunk)
    cb()
  }
}

const lower = new LowercaseTransformer({encoding: 'utf8'})




lower.pipe(outstream)

// instream.pipe(linestream).pipe(lower).pipe(outstream)

