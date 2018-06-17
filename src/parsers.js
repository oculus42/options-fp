/**
 * Options parsers.
 * All parsers should follow this argument structure:
 * @param {*} [value] - Optional incoming value
 * @param {*} [previousValue] - Optional default or previous value
 * @param {Object} [data] - Option data in storage format.
 * @param {Object} [config] - Option config object
 */

const parsers = {
  default: val => val,
  range: val => val.split('..').map(Number),
  list: val => val.split(','),
  collect: (val, list = []) => [...list, val],
  increment: (val, total = 0) => total + 1,
};

module.exports = parsers;
