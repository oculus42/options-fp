const defaults = {
  errorOnUnknown: true,
  caseSensitive: true,
  negationPrefix: true,
  stopAtEmptyDouble: true,
  supportDuplicates: false,
};

const option_format = {
  short: 'a',
  long: 'always',
  list: false,
  hasArg: true,
  argParser: a => a,
  default: undefined
};

module.exports = {
  defaults,
  option_format,
};
