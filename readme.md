# m-o

A Node.js package of has/get/set/delete methods that work on both Maps and Objects, letting you write code that can handle either, if that’s your M.O.

## Installation

```bash
npm install m-o --save
```

## Usage

Nota Bene: Maps can accept keys of any type, but Objects cannot. If you expect your code to work with both, then you can only use strings, numbers, or symbols as keys.

```javascript
const mo = require('m-o')

const map = new Map()
const obj = {}

mo.set(map, 'hello', 'world')
mo.set(obj, 'hello', 'world')

mo.has(map, 'hello') // true
mo.has(obj, 'hello') // true

mo.get(map, 'hello') // 'world'
mo.get(obj, 'hello') // 'world'

// The normal way:
map.get('hello') // 'world'
obj.hello // 'world'

mo.delete(map, 'hello') // true
mo.delete(obj, 'hello') // true
mo.delete(map, 'nonexistent') // false
mo.delete(obj, 'nonexistent') // false
```

By default, `has` and `get` treat an object like a dictionary and therefore only access its own properties. If you want these two methods to access object prototype properties as well, pass `true` as the third parameter. (Doing so will have no effect on behavior regarding Maps.)

```javascript
typeof obj.toString // 'function'
typeof mo.get(obj, 'toString') // 'undefined'
typeof mo.get(obj, 'toString', true) // 'function'

mo.has(obj, 'toString') // false
mo.has(obj, 'toString', true) // true
```
