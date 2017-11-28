'use strict'

const getOwnProperty = require('get-own-property')
const ifElseThrow = require('if-else-throw')
const isObj = require('is-object')

const check = mo => ifElseThrow(isObj(mo), mo, new TypeError('m-o requires a Map or an Object'))
const isMap = mo => check(mo) instanceof Map

const has = (mo, key, proto) => isMap(mo) ? mo.has(key) : proto ? key in mo : Object.prototype.hasOwnProperty.call(mo, key)
const get = (mo, key, proto) => isMap(mo) ? mo.get(key) : proto ? mo[key] : getOwnProperty(mo, key)
const set = (mo, key, val) => { if (isMap(mo)) mo.set(key, val); else mo[key] = val }
const del = (mo, key) => isMap(mo) ? mo.delete(key) : has(mo, key) ? delete mo[key] : false

module.exports = {has, get, set, delete: del}
