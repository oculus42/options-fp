const defaults = require('./defaults');

const locateEmptyDouble = options => options.findIndex(arg => arg.rawValue === '--');

const shortenArgs = (config, options) => {
  if (config.stopAtEmptyDouble === true) {
    const emptyIndex = locateEmptyDouble(options);

    if (emptyIndex !== -1) {
      // If it is first, send an empty array back
      if (emptyIndex === 0) {
        return [];
      }
      // Do not send back the empty double "terminator"
      return options.slice(0, emptyIndex - 1);
    }
  }

  return options;
};

const expandMultiple = (options) => {
  const expandedOptions = options.map((arg) => {
    if (!arg.isMultiple) {
      return arg;
    }

    return arg.cleanOption.split('').map((key, index) => Object.assign({}, arg, {
      // rawOption: `-${key}`, // TODO: Should we fake a raw option?
      cleanOption: key,
      subIndex: index,
      isMultiple: false,
    }));
  });

  // Flatten
  return expandedOptions.reduce((acc, val) => acc.concat(val), []);
};

const parse = (config, identity) => {
  const usableOptions = shortenArgs(config, identity);
  const expandedOptions = expandMultiple(usableOptions);
  // const { optionSet } = config;

  return expandedOptions;
};

module.exports = parse;
