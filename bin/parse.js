#!/usr/bin/env node
/* eslint no-console:0 */

const parse = require('../src/parse');
const identify = require('../src/identify');

const [,, ...args] = process.argv;
const identity = args.map(identify);
const data = parse({}, identity);

console.log(data);
