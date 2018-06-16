const parsers = require('./parsers');

const isOption = el => el[0] === '-' && el.length > 1 && /^--?[^-]/.test(el);
const makeNegationPredicate = prefix => el => el.indexOf(prefix) === 0;
const hasNegationPrefix = makeNegationPredicate('--no-');
const optionExists = (opts, opt) => typeof opts[opt] === 'object';
const optionHasArgs = (opts, opt) => opts[opt].argStyle !== undefined;
const followsOption = (val, idx, arr) => idx > 0 && !isOption(val) && isOption(arr[idx - 1]);


const processOption = ({ optionSet, opt, value, config={}, result={} }) => {
 if (!isOption(opt)) {
   return result;
 }

 // If no entry in the optionSet, it's an error.

 if (!optionExists(optionSet, opt)) {
   if (config.errorOnUnknown === true) {
    throw new Error(`Unknown option: ${opt}`);
   }

   // TODO:
 }
};

module.exports = {
  isOption,
  makeNegationPredicate,
  hasNegationPrefix,
  optionExists,
  optionHasArgs,
  followsOption,
};
