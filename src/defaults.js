const default_settings = {
  errorOnUnknown: true,
  caseSensitive: true,
  negationPrefix: true,
  stopAtEmptyDouble: true,
  supportDuplicates: false,
};

const option_definition_format = {
  short: 'a',
  long: 'always',
  list: false,
  hasArg: true,
  argParser: a => a,
  default: undefined
};

const option_storage_format = {
  value: '',
  isUnknown: false,
};

module.exports = {
  default_settings,
  option_definition_format,
  option_storage_format,
};
