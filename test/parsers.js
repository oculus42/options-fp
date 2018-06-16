const assert = require('assert');

const parsers = require('../src/parsers');

// Range
const range = () => {
  // Decimal
  assert.equal(parsers.range('1..4').join(), [1, 4].join());
  assert.equal(parsers.range('4..1').join(), [4, 1].join());

  // Negative numbers
  assert.equal(parsers.range('-1..-4').join(), [-1, -4].join());

  // Binary
  assert.equal(parsers.range('0b10..0b100').join(), [2, 4].join());

  // Hexadecimal
  assert.equal(parsers.range('0x10..0x20').join(), [16, 32].join());
  assert.equal(parsers.range('0xA..0xF').join(), [10, 15].join());

  // Mixed
  assert.equal(parsers.range('16..0x20').join(), [16, 32].join());

  // Open-ended ranges
  // TODO: should this behavior be changed to provide undefined instead of 0?
  assert.equal(parsers.range('..').join(), [0, 0].join());
  assert.equal(parsers.range('..5').join(), [0, 5].join());
  assert.equal(parsers.range('5..').join(), [5, 0].join());

  // Oddball
  assert.equal(parsers.range('-Infinity..Infinity').join(), ['-Infinity', 'Infinity'].join());
  assert.equal(parsers.range('NaN..Infinity').join(), ['NaN', 'Infinity'].join());

  // Bad inputs
  // TODO - Should there be an option to throw an error for non-numeric inputs
  assert.equal(parsers.range('-..A').join(), ['NaN', 'NaN'].join());
};

// List
const list = () => {
  // Empty slots
  // TODO - Should these be errors? Configurable errors?
  // TODO - Should it remove undefined? Should that be configurable?
  assert.equal(JSON.stringify(parsers.list('a,,b')), '["a","","b"]');
  assert.equal(JSON.stringify(parsers.list('a,b,')), '["a","b",""]');
};

// Collect
const collect = () => {

};


// Increment
const increment = () => {

};

// Execute
range();
list();
collect();
increment();
