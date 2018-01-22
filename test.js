'use strict'

const assert = require('assert')
const {has, hasIn, get, getIn, set, edit, delete: del, construct, reconstruct, entries, entriesArray, keys, keysArray, values, valuesArray} = require('.')

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
    set(map, key, 'value')
    assert.strictEqual(map.get(key), 'value')
  })

  it('should set a symbol key on an Object', function () {
    const key = Symbol('key')
    const obj = {}
    set(obj, key, 'value')
    assert.strictEqual(obj[key], 'value')
  })

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
})

describe('hasIn()', function () {
  it('should return true for an Object prototype property', function () {
    assert(hasIn({}, 'toString'))
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
})

describe('getIn()', function () {
  it('should return an Object prototype property', function () {
    assert.strictEqual(typeof getIn({}, 'toString'), 'function')
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

describe('edit()', function () {
  it('should pass the existing Map value as an argument to the callback', function () {
    const map = new Map()
    set(map, 'hello', 'world')
    edit(map, 'hello', value => { assert.strictEqual(value, 'world') })
  })

  it('should pass the existing Object value as an argument to the callback', function () {
    edit({hello: 'world'}, 'hello', value => { assert.strictEqual(value, 'world') })
  })

  it('should pass undefined to the callback if no Map value', function () {
    edit(new Map(), 'nonexistent', value => { assert.strictEqual(typeof value, 'undefined') })
  })

  it('should pass undefined to the callback if no Object value', function () {
    edit({}, 'nonexistent', value => { assert.strictEqual(typeof value, 'undefined') })
  })

  it('should modify the Map value with the callback return value', function () {
    const map = new Map([['hello', 'world']])
    edit(map, 'hello', value => value + '!')
    assert.strictEqual(map.get('hello'), 'world!')
  })

  it('should modify the Object value with the callback return value', function () {
    const obj = {hello: 'world'}
    edit(obj, 'hello', value => value + '!')
    assert.strictEqual(obj.hello, 'world!')
  })
})

describe('construct()', function () {
  it('should construct a Map if the Map class is provided', function () {
    assert.strictEqual(construct(Map).constructor, Map)
  })

  it('should construct with the Map subclass provided', function () {
    class XMap extends Map {}
    assert.strictEqual(construct(XMap).constructor, XMap)
  })

  it('should construct an Object if the Object class is provided', function () {
    assert.strictEqual(construct(Object).constructor, Object)
  })

  it('should construct a Map containing the given entries', function () {
    const map = construct(Map, [['a', 1]])
    assert.strictEqual(map.size, 1)
    assert.strictEqual(map.get('a'), 1)
  })

  it('should construct an Object containing the given entries', function () {
    const obj = construct(Object, Object.entries({a: 1}))
    assert.strictEqual(Object.keys(obj).length, 1)
    assert.strictEqual(obj.a, 1)
  })
})

describe('reconstruct()', function () {
  it('should construct a Map if a Map is provided', function () {
    assert.strictEqual(reconstruct(new Map()).constructor, Map)
  })

  it('should construct with the Map subclass of the object provided', function () {
    class XMap extends Map {}
    assert.strictEqual(reconstruct(new XMap()).constructor, XMap)
  })

  it('should construct an Object if an Object is provided', function () {
    assert.strictEqual(reconstruct({}).constructor, Object)
  })

  it('should construct a Map containing the given entries', function () {
    const map1 = new Map([['a', 1]])
    const map2 = reconstruct(map1, map1.entries())
    assert.notStrictEqual(map1, map2)
    assert.strictEqual(map2.size, 1)
    assert.strictEqual(map2.get('a'), 1)
  })

  it('should construct an Object containing the given entries', function () {
    const obj1 = {a: 1}
    const obj2 = reconstruct(obj1, Object.entries(obj1))
    assert.notStrictEqual(obj1, obj2)
    assert.strictEqual(Object.keys(obj2).length, 1)
    assert.strictEqual(obj2.a, 1)
  })
})

describe('entries()', function () {
  it('should return an iterator for a Map', function () {
    assert.strictEqual(typeof entries(new Map()).next, 'function')
  })

  it('should return an iterator for an Object', function () {
    assert.strictEqual(typeof entries({}).next, 'function')
  })

  it('should return the appropriate number of entries', function () {
    assert.strictEqual(Array.from(entries({a: 1})).length, 1)
  })

  it('should iterate two-element array values for Maps', function () {
    const entry = Array.from(entries(new Map([['a', 1]])))[0]
    assert(Array.isArray(entry))
    assert.strictEqual(entry[0], 'a')
    assert.strictEqual(entry[1], 1)
  })

  it('should iterate two-element array values for Objects', function () {
    const entry = Array.from(entries({a: 1}))[0]
    assert(Array.isArray(entry))
    assert.strictEqual(entry[0], 'a')
    assert.strictEqual(entry[1], 1)
  })
})

describe('entriesArray()', function () {
  it('should return an array for a Map', function () {
    assert(Array.isArray(entriesArray(new Map())))
  })

  it('should return an array for an Object', function () {
    assert(Array.isArray(entriesArray({})))
  })
})

describe('keys()', function () {
  it('should return an iterator for a Map', function () {
    assert.strictEqual(typeof keys(new Map()).next, 'function')
  })

  it('should return an iterator for an Object', function () {
    assert.strictEqual(typeof keys({}).next, 'function')
  })

  it('should return the appropriate number of keys', function () {
    assert.strictEqual(Array.from(keys({a: 1})).length, 1)
  })

  it('should iterate the keys of a Map', function () {
    const key = Symbol('key')
    assert.strictEqual(Array.from(keys(new Map([[key, 1]])))[0], key)
  })

  it('should iterate the keys of an Object', function () {
    assert.strictEqual(Array.from(keys({a: 1}))[0], 'a')
  })
})

describe('keysArray()', function () {
  it('should return an array for a Map', function () {
    assert(Array.isArray(keysArray(new Map())))
  })

  it('should return an array for an Object', function () {
    assert(Array.isArray(keysArray({})))
  })
})

describe('values()', function () {
  it('should return an iterator for a Map', function () {
    assert.strictEqual(typeof values(new Map()).next, 'function')
  })

  it('should return an iterator for an Object', function () {
    assert.strictEqual(typeof values({}).next, 'function')
  })

  it('should return the appropriate number of values', function () {
    assert.strictEqual(Array.from(values({a: 1})).length, 1)
  })

  it('should iterate the values of a Map', function () {
    assert.strictEqual(Array.from(values(new Map([['a', 1]])))[0], 1)
  })

  it('should iterate the values of an Object', function () {
    assert.strictEqual(Array.from(values({a: 1}))[0], 1)
  })
})

describe('valuesArray()', function () {
  it('should return an array for a Map', function () {
    assert(Array.isArray(valuesArray(new Map())))
  })

  it('should return an array for an Object', function () {
    assert(Array.isArray(valuesArray({})))
  })
})
