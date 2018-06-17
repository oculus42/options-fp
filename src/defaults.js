const defaultSettings = {
  errorOnUnknown: true,
  caseSensitive: true,
  negationPrefix: true,
  stopAtEmptyDouble: true,
  supportDuplicates: false,
};

// TODO: Creating reasonable defaults for unknown options
// This is going to be the most complex portion, I suspect.
const defaultOptionSettings = {
  list: false,
  hasArg: true,
  argParser: a => a,
  default: undefined,
  negatable: true,
};

const formatOptionDefinition = {
  short: 'a',
  long: 'always',
  list: false,
  negatable: false,
  hasArg: true,
  argParser: a => a,
  default: undefined,
};

const formatOptionStorage = {
  rawOption: '',
  rawValue: '',
  value: '',
  isNegated: false,
  isUnknownOption: false,
};

module.exports = {
  defaultSettings,
  defaultOptionSettings,
  formatOptionDefinition,
  formatOptionStorage,
};
