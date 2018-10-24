DSN From JCL
============

Extract DSN _Dataset Name_ from JCL _Job Control Language_

v1.1.0

[![Build Status](https://travis-ci.com/jonathangersam/dsn-from-jcl.svg?branch=master)](https://travis-ci.com/jonathangersam/dsn-from-jcl) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Usage
-----
Want to use in your codebase? Import via 'require'

```javascript
const dsn = require('dsn-from-jcl')
const sample = '//INFILE DD DSN=TZSP.MY.FILE,DISP=SHR' // lines of valid JCL, separated by newline characters

const result = dsn.extractFromString(sample, 'TZSP')
console.log(result) // expect [ 'TZSP.MY.FILE' ]
```

Want to run in interactive mode? Run `npm start` or `node script.js`.

```
*** EXTRACT DSN FROM JCL, INTERACTIVE MODE ***
1) your input file path? > ./spec/input.txt
2) your output path?> myoutput.txt
3) 1st DSN qualifier to search for? > TZSP
RESULT:
 [ 'TZSP.SOME.FILE', null, 'TZSP.EXTRA.FILE.HERE' ]
```

Docs
----
### `extractFromString(text, qualifier, opt)`
- Returns an array containing valid **DSNs** that begin with the given **qualifier** for each line in the given **text**.

### `extractFromFile(filepath, qualifier, opt)`
- Behaves similarly to `extractFromString`, but reads data from the given file on disk.

Build
-----
No build dependencies.

Test
----
1. Install test dependencies via `npm install`
2. Run unit test suite via `npm test`

About
-----
Coded with <3 by Jonathan Lopez

line add 1