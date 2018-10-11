DSN From JCL v1.0.0
-------------------

Extract _Dataset Name_ (DSN) from _Job Control Language_ (JCL)

[![Build Status](https://travis-ci.com/jonathangersam/dsn-from-jcl.svg?branch=master)](https://travis-ci.com/jonathangersam/dsn-from-jcl)

Usage
=====

Want to import into your codebase? Use 'require'

```
const dsn = require('dsn-from-jcl')
const sample = '//INFILE DD DSN=TZSP.MY.FILE,DISP=SHR' // lines of valid JCL, separated by newline characters

const result = dsn.extractFromString(sample, 'TZSP')
console.log(result) // expect [ 'TZSP.MY.FILE' ]
```

Want to view an example usage? Run `node example`.

Docs
====

1. `extractFromString(text, qualifier, opt)` returns an array containing valid **DSNs** begin with the given **qualifier** for each line in the given **text**.
2. `extractFromFile(filepath, qualifier, opt)` behaves similarly to (1), but reads data from a file on disk.

Build
=====

TBD

Test
====

1. Install test dependencies via `npm install`
2. Run unit test suite via `npm test`

About
=====

Coded with <3 by jonathangersam
