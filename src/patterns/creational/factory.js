import extend from '../../helpers/extend.js';
import createPatternBuilder from '../../helpers/createPatternBuilder.js';

export default createPatternBuilder(options => {
  function Factory(...args) {
    this.__classes = {};
    options.constructor.apply(this, args);
  }

  extend(Factory.prototype, {
    add(className, __class) {
      if(this.__classes[className] !== undefined) {
        throw new Error('class is already defined in factory');
      }
      this.__classes[className] = __class;
      return this;
    },

    create(className, ...args) {
      if(this.__classes[className] === undefined) {
        throw new Error('class is not defined in factory');
      }
      return new this.__classes[className](...args);
    }
  });

  return Factory;
});
