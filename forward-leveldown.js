var inherits = require('inherits')

  , AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN

  , ForwardLeveldown = function (db) {
      AbstractLevelDOWN.call(this, '/does-not-matter')
      this.db = db
    }

inherits(ForwardLeveldown, AbstractLevelDOWN)

ForwardLeveldown.prototype._get = function (key, options, callback) {
  this.db.get(key, options, callback)
}

ForwardLeveldown.prototype._put = function (key, value, options, callback) {
  this.db.put(key, value, options, callback)
}

ForwardLeveldown.prototype._del = function (key, options, callback) {
  this.db.del(key, options, callback)
}

ForwardLeveldown.prototype._batch = function (array, options, callback) {
  this.db.batch(array, options, callback)
}

ForwardLeveldown.prototype._chainedBatch = function () {
  return this.db.batch()
}

ForwardLeveldown.prototype._open = function (options, callback) {
  this.db.open(options, callback)
}

ForwardLeveldown.prototype._close = function (callback) {
  this.db.close(callback)
}

module.exports = ForwardLeveldown