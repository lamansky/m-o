# m-o

A collection of functions that work on both Maps and Objects, letting you write code that can handle either, if that’s your M.O.

The functions are: `has`, `hasIn`, `get`, `getIn`, `set`, `edit`, `delete`, `reconstruct`, `entries`, `keys`, and `values`.

## Installation

```bash
npm install m-o --save
```

## Usage Example

Nota Bene: Maps can accept keys of any type, but Objects cannot. If you expect your code to work with both, then you should only use strings/numbers/symbols as keys.

```javascript
const mo = require('m-o')

const map = new Map()
const obj = {}

// Set
mo.set(map, 'hello', 'world')
mo.set(obj, 'hello', 'world')

// Has
mo.has(map, 'hello') // true
mo.has(obj, 'hello') // true

// Get
mo.get(map, 'hello') // 'world'
mo.get(obj, 'hello') // 'world'

// vs. the normal way:
map.get('hello') // 'world'
obj.hello // 'world'

// Edit
mo.edit(map, 'hello', value => value + '!')
mo.edit(obj, 'hello', value => value + '!')
mo.get(map, 'hello') // 'world!'
mo.get(obj, 'hello') // 'world!'

// Delete
mo.delete(map, 'hello') // true
mo.delete(obj, 'hello') // true
mo.delete(map, 'nonexistent') // false
mo.delete(obj, 'nonexistent') // false

// Entries
mo.entries(map) // MapIterator
mo.entries(obj) // []
```

By default, `has` and `get` treat an object like a dictionary and therefore only access its own properties. If you want to access object prototype properties as well, use the `hasIn` or `getIn` methods instead. (With Maps, behavior is the same regardless of which set of methods you use.)

```javascript
typeof obj.toString // 'function'
typeof mo.get(obj, 'toString') // 'undefined'
typeof mo.getIn(obj, 'toString') // 'function'

mo.has(obj, 'toString') // false
mo.hasIn(obj, 'toString') // true
```
