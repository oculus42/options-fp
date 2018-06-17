/**
 * @param {string} el
 * @return {boolean}
 */
const isOption = el => el[0] === '-' && el.length > 1 && /^--?[^-]/.test(el);

/**
 * @function hasNegationPrefix
 * @param {string} option
 * @return {boolean}
 */
const hasNegationPrefix = option => /^--no-/i.test(option);

// TODO: How should we handle the existence of multi-character shorthand?
const identifyOption = (option, index) => {
  if (!isOption(option)) {
    // Presumably this is a value for an earlier field?
    // This function has no way to distinguish that.
    // Just return an object with a rawValue and index.
    return {
      rawValue: option,
      originalIndex: index,
    };
  }

  const isDoubleDash = /^--/.test(option);
  const isNegated = isDoubleDash && hasNegationPrefix(option);
  const coreOptionMatch = option.match(/^--?(?:no-)?([^=]*)=?(.*)/);
  const didMatch = !!coreOptionMatch; // False or null

  if (!didMatch) {
    // this is an error condition?
    // TODO: Is this posisble given the earlier constraints?
  }

  const [, cleanOption, cleanValue] = coreOptionMatch;
  const isMultiple = didMatch && !isDoubleDash && cleanOption.length > 1;

  return {
    isDoubleDash,
    isNegated,
    isMultiple,
    cleanOption,
    cleanValue,
    originalIndex: index,
    rawOption: option,
  };
};

module.exports = identifyOption;

