#!/usr/bin/env node
/* eslint no-console:0 */

const identify = require('../src/identify');

const [,, ...args] = process.argv;
console.log(args.map(identify));
