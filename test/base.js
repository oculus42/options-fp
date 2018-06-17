const assert = require('assert');

const fopt = require('../src/base');


// isOption

assert(fopt.isOption('-a'));
assert(fopt.isOption('-A'));
assert(fopt.isOption('-v'));
assert(fopt.isOption('-vv'));
assert(fopt.isOption('-vvv'));
assert(fopt.isOption('--foo'));
assert(fopt.isOption('--foo=42'));
assert(fopt.isOption('--no-foo'));

// isOption Negative Tests
assert(!fopt.isOption('-'));
assert(!fopt.isOption('--'));
assert(!fopt.isOption('~/.ssh/'));
assert(!fopt.isOption('foo'));
assert(!fopt.isOption('42'));
assert(!fopt.isOption('false'));

// hasNegationPrefix
assert(fopt.hasNegationPrefix('--no-way'));
assert(fopt.hasNegationPrefix('--no-dice'));

assert(!fopt.hasNegationPrefix('--no'));
assert(!fopt.hasNegationPrefix('--norway'));
assert(!fopt.hasNegationPrefix('-no'));
assert(!fopt.hasNegationPrefix('-no-way'));
assert(!fopt.hasNegationPrefix('-norway'));

// followsOption
let options;
let args;

options = {
  foo: {
    long: 'foo',
    list: false,
    hasArg: true,
    argParser: a => a,
    default: undefined,
  },
};
args = ['--foo', 42];

assert.deepEqual(args.map(fopt.followsOption), [false, true]);

options = {
  foo: {
    long: 'foo',
    list: false,
    hasArg: false,
    argParser: a => a,
    default: undefined,
  },
};
args = ['--foo', 'yes', '--bar'];

assert.deepEqual(args.map(fopt.followsOption), [false, true, false]);

args = ['--bar', 'no', '--foo', 'yes'];

assert.deepEqual(args.map(fopt.followsOption), [false, true, false, true]);


// Complete
console.log('All tests passed.');
