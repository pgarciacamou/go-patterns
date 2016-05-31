import extend from './extend.js';

/**
 * @object
 * @private
 *
 * methods that will be added to logical functions.
 */
var _logicalOperators = {

  /**
   * @param {Function} next should return a boolean value
   * @return {Function} logicalFunction that allows chainability
   *
   * applies 'and / &&' operator to result of both functions
   */
  and(next) {
    var prev = this;
    return logicalFunction((...args) => {
      return prev(...args) && next(...args);
    });
  },

  /**
   * @param {Function} next should return a boolean value
   * @return {Function} logicalFunction that allows chainability
   *
   * applies 'or / ||' operator to result of both functions
   */
  or(next) {
    var prev = this;
    return logicalFunction((...args) => {
      return prev(...args) || next(...args);
    });
  }
};

/**
 * @function
 *
 * @param {Function} fn should return a boolean value
 * @return {Function} fn containing logical operators
 */
function logicalFunction(fn) {
  return extend(fn, _logicalOperators);
}

export default logicalFunction;