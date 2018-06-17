const parsers = require('./parsers');
const defaults = require('./defaults');


/**
 * @param {string} el
 * @return {boolean}
 */
const isOption = el => el[0] === '-' && el.length > 1 && /^--?[^-]/.test(el);

/**
 * TODO: Should it be case insensitive? Configurable?
 * @function hasNegationPrefix
 * @param {string} option
 * @return {boolean}
 */
const hasNegationPrefix = option => /^--no-/i.test(option);

/**
 * @param {Object} optionSet
 * @param {string} option
 * @return {boolean}
 */
const optionExists = (optionSet, option) => typeof optionSet[option] === 'object';

/**
 *
 * @param optionSet
 * @param option
 * @return {boolean}
 */
const optionHasArgs = (optionSet, option) => optionSet[option].argStyle !== undefined;
const followsOption = (val, idx, arr) => idx > 0 && !isOption(val) && isOption(arr[idx - 1]);

/**
 *
 * @param {Object} optionSet
 * @param {string} option
 * @return {Object}
 */
const getOptionSettings = (optionSet, option) => optionSet[option];

// TODO: This is going to be a mess.
const generateUnknownOptionSettings = option => Object.assign(
  {},
  defaults.defaultOptionSettings,
  {
    long: option,
  },
);

const concatIfNeeded = (oldValue, newValue) => {
  // Single values are returned directly
  if (oldValue === undefined) {
    return newValue;
  }

  const baseValue = Array.isArray((oldValue)) ? oldValue : [oldValue];

  return [...baseValue, newValue];
};

const getOptionDataBeforeParsing = ({ option, value, data = {} }) => {
  const isNegated = hasNegationPrefix(option);

  return Object.assign({}, data, {
    // TODO: Should isNegated be set if the object does not support negation?
    // TODO: Should it throw an error in that case?
    // TODO: Should it consider it an unknown if the base does not support negation?
    isNegated,
    rawOption: concatIfNeeded(data.rawOption, option),
    rawValue: concatIfNeeded(data.rawValue, value),
  });
};

const getOptionData = (settings, { value, optionConfig, data } = settings) => {
  const preParseData = getOptionDataBeforeParsing(settings);

  const parser = data.parser || parsers.default;
  const parsedValue = parser(value, preParseData.value, preParseData, optionConfig);

  return Object.assign({}, preParseData, {
    value: parsedValue,
  });
};

const addOptionToResult = (settings, { option, value, optionConfig, config, result } = settings) => {
  const data = result[option];
  const parsedValue = getOptionData({
    option,
    value,
    optionConfig,
    config,
    data,
  });
};


const getBaseOptionName = (config, optionSet, option) => {
  // TODO: Must strip away the hyphens and "no" prefix

};

const processOption = ({
  optionSet,
  opt: option,
  value,
  config = {},
  result = {},
}) => {
  if (!isOption(option)) {
    return result;
  }

  const exists = optionExists(optionSet, option);

  // If no entry in the optionSet, it's an error.
  if (!exists && config.errorOnUnknown === true) {
    throw new Error(`Unknown option: ${option}`);
  }

  const optionConfig = exists ?
    getOptionSettings(optionSet, option) :
    generateUnknownOptionSettings(option);

  return addOptionToResult({
    option,
    value,
    optionConfig,
    config,
    result,
  });
};

module.exports = {
  isOption,
  hasNegationPrefix,
  optionExists,
  optionHasArgs,
  followsOption,
  processOption,
};
