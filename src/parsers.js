const parsers = {
  range: val => val.split('..').map(Number),
  list: val => val.split(','),
  collect: (val, list) => [...list, val],
  increment: (val, total) => total + 1,
};

module.exports = parsers;
