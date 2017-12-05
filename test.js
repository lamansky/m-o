'use strict'

const assert = require('assert')
const {has, get, set, delete: del} = require('.')

describe('set()', function () {
  it('should set a string key on a Map', function () {
    const map = new Map()
    set(map, 'hello', 'world')
    assert.strictEqual(map.get('hello'), 'world')
  })

  it('should set a string key on an Object', function () {
    const obj = {}
    set(obj, 'hello', 'world')
    assert.strictEqual(obj.hello, 'world')
  })

  it('should set a symbol key on a Map', function () {
    const key = Symbol('key')
    const map = new Map()
    set(map, key, 'world')
    assert.strictEqual(map.get(key), 'world')
  })

  it('should set a symbol key on an Object', function () {
    const key = Symbol('key')
    const obj = {}
    set(obj, key, 'world')
    assert.strictEqual(obj[key], 'world')

  it('should return the Map', function () {
    const map = new Map()
    assert.strictEqual(set(map, '123', '456'), map)
  })

  it('should return the Object', function () {
    const obj = {}
    assert.strictEqual(set(obj, '123', '456'), obj)
  })
})

describe('has()', function () {
  it('should return true for an existing key on a Map', function () {
    const map = new Map()
    map.set('hello', 'world')
    assert(has(map, 'hello'))
  })

  it('should return true for an existing key on an Object', function () {
    const obj = {}
    obj.hello = 'world'
    assert(has(obj, 'hello'))
  })

  it('should return false for a non-existing key on a Map', function () {
    assert(!has(new Map(), 'hello'))
  })

  it('should return false for a non-existing key on an Object', function () {
    assert(!has({}, 'hello'))
  })

  it('should return false for an Object prototype property', function () {
    assert(!has({}, 'hasOwnProperty'))
  })

  it('should return true for an Object prototype property if parameter 3 is true', function () {
    assert(has({}, 'toString', true))
  })
})

describe('get()', function () {
  it('should return value for an existing key on a Map', function () {
    const map = new Map()
    map.set('hello', 'world')
    assert.strictEqual(get(map, 'hello'), 'world')
  })

  it('should return true for an existing key on an Object', function () {
    const obj = {}
    obj.hello = 'world'
    assert.strictEqual(get(obj, 'hello'), 'world')
  })

  it('should return undefined for a non-existing key on a Map', function () {
    assert.strictEqual(typeof get(new Map(), 'hello'), 'undefined')
  })

  it('should return undefined for a non-existing key on an Object', function () {
    assert.strictEqual(typeof get({}, 'hello'), 'undefined')
  })

  it('should return undefined for an Object prototype property', function () {
    assert.strictEqual(typeof get({}, 'hasOwnProperty'), 'undefined')
  })

  it('should return an Object prototype property if parameter 3 is true', function () {
    assert.strictEqual(typeof get({}, 'toString', true), 'function')
  })
})

describe('delete()', function () {
  it('should return true when deleting an existing key on a Map', function () {
    const map = new Map()
    map.set('hello', 'world')
    assert.strictEqual(del(map, 'hello'), true)
  })

  it('should return true when deleting an existing key on an Object', function () {
    const obj = {}
    obj.hello = 'world'
    assert.strictEqual(del(obj, 'hello'), true)
  })

  it('should return false when deleting a non-existing key on a Map', function () {
    assert.strictEqual(del(new Map(), 'hello'), false)
  })

  it('should return false when deleting a non-existing key on an Object', function () {
    assert.strictEqual(del({}, 'hello'), false)
  })

  it('should return false when deleting a prototype property on an Object', function () {
    assert.strictEqual(del({}, 'toString'), false)
  })
})
