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