import extend from "./extend.js";

/**
 * @method
 * @param  {Object} options holds the constructor, prototype, and static props.
 * @return {Class}
 */
function createClass(options){
  if(options === undefined) { options = {}; }
  options = extend({
    constructor: _ => {},
    publics: {},
    statics: {}
  }, options);

  function C(...args) {
    options.constructor(this, ...args);
  }
  extend(C, options.statics);
  C.prototype = Object.create(options.publics);
  C.prototype.constructor = options.constructor;

  return C;
}

export default createClass;