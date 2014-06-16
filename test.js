var ForwardLevelDOWN = require('./forward-leveldown')

  , test = require('tap').test

test('get() forward correctly', function (t) {
  t.plan(4)

  var original = {
        get: function (key, options, callback) {
          t.equal(key, 'hello')
          t.deepEqual(options, {})
          callback(null, new Buffer('world'))
        }
      }
    , forward = new ForwardLevelDOWN(original)

  forward.get('hello', function (err, value) {
    t.error(err)
    t.deepEqual(value, new Buffer('world'))
    t.end()
  })
})

test('put() forward correctly', function (t) {
  t.plan(4)

  var original = {
          put: function (key, value, options, callback) {
            t.equal(key, 'hello')
            t.equal(value, 'world')
            t.deepEqual(options, {})
            callback(null)
          }
      }
    , forward = new ForwardLevelDOWN(original)

  forward.put('hello', 'world', function (err) {
    t.error(err)
    t.end()
  })
})

test('del() forward correctly', function (t) {
  t.plan(4)

  var original = {
        del: function (key, options, callback) {
          t.equal(key, 'hello')
          t.deepEqual(options, {})
          callback(null, new Buffer('world'))
        }
      }
    , forward = new ForwardLevelDOWN(original)

  forward.del('hello', function (err, value) {
    t.error(err)
    t.deepEqual(value, new Buffer('world'))
    t.end()
  })
})

test('batch() forward correctly', function (t) {
  t.plan(2)

  var original = {
          batch: function (array, options, callback) {
            t.deepEqual(array, [ { type: 'put', key: 'hello', value: 'world' }])
            callback(null)
          }
      }
    , forward = new ForwardLevelDOWN(original)

  forward.batch([{ type: 'put', key: 'hello', value: 'world' }], function (err) {
    t.error(err)
    t.end()
  })
})

test('chained batch() forward correctly', function (t) {
  t.plan(3)

  var original = {
        batch: function () {
          return {
            put: function (key, value) {
              t.deepEqual(key, 'hello')
              t.deepEqual(value, 'world')
              return this
            }
          , write: function (callback) {
              t.pass('should call write-function')
              callback(null)
            }
          }
        }
      }
    , forward = new ForwardLevelDOWN(original)

  forward.batch().put('hello', 'world').write(function () {
    t.end()
  })
})

test('forward open() correctly', function (t) {
  t.plan(2)

  var original = {
        open: function (options, callback) {
          t.deepEqual(options, { hello: 'world' })
          callback(null)
        }
      }
    , forward = new ForwardLevelDOWN(original)

  forward.open({ hello: 'world' }, function (err, value) {
    t.error(err)
    t.end()
  })
})

test('forward close() correctly', function (t) {
  t.plan(2)

  var original = {
        close: function (callback) {
          t.pass()
          callback(null)
        }
      }
    , forward = new ForwardLevelDOWN(original)

  forward.close(function (err) {
    t.error(err)
    t.end()
  })})