DSN From JCL
============

Extract _Dataset Name_ (DSN) from _Job Control Language_ (JCL)

v1.0.1

[![Build Status](https://travis-ci.com/jonathangersam/dsn-from-jcl.svg?branch=master)](https://travis-ci.com/jonathangersam/dsn-from-jcl) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Usage
-----
Want to import into your codebase? Use 'require'

```javascript
const dsn = require('dsn-from-jcl')
const sample = '//INFILE DD DSN=TZSP.MY.FILE,DISP=SHR' // lines of valid JCL, separated by newline characters

const result = dsn.extractFromString(sample, 'TZSP')
console.log(result) // expect [ 'TZSP.MY.FILE' ]
```

Want to view an example usage? Run `node example`.

Docs
----
### extractFromString(text, qualifier, opt)
- Function returns an array containing valid **DSNs** that begin with the given **qualifier** for each line in the given **text**.

### extractFromFile(filepath, qualifier, opt)
- Behaves similarly to `extractFromString`, but reads data from the given file on disk.

Build
-----
TBD

Test
----
1. Install test dependencies via `npm install`
2. Run unit test suite via `npm test`

About
-----
Coded with <3 by jonathangersam
