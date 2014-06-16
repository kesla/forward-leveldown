# forward-leveldown

An abstract-leveldown variant where all missing methods get redirected to another leveldown-instance

[![NPM](https://nodei.co/npm/forward-leveldown.png?downloads&stars)](https://nodei.co/npm/forward-leveldown/)

[![NPM](https://nodei.co/npm-dl/forward-leveldown.png)](https://nodei.co/npm/forward-leveldown/)

## Installation

```
npm install forward-leveldown
```

## Example

### Input

```javascript
var inherits = require('inherits')

  , ForwardLevelDOWN = require('./forward-leveldown')
    //  root represents a leveldown-compatible object
  , root = {
      get: function (key, opts, callback) {
        console.log('root function gets called cause _get is not implemented')
        callback(null, 'beep boop')
      }
    }
  , ExampleDOWN = function (db) {
      ForwardLevelDOWN.call(this, db)
    }
  , db
inherits(ExampleDOWN, ForwardLevelDOWN)

ExampleDOWN.prototype._put = function (key, value, options, callback) {
  console.log('this gets called, so now we could do something intersting here')
  callback(null)
}

db = new ExampleDOWN(root)

db.get('beep', function () {
  db.put('hello', 'world!', function () {

  })
})
```

### Output

```
root function gets called cause _get is not implemented
this gets called, so now we could do something intersting here
```

## Licence

Copyright (c) 2014 David Björklund

This software is released under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

