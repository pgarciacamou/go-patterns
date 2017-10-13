import extend from './extend.js';

export default function createPatternBuilder(getConstructor) {
  return (options = {}) => {
    options = extend({
      // can't be an arrow function as it does not have a prototype
      constructor: function() {},
      publics: {},
      statics: {}
    }, options);

    const __constructor = getConstructor(options);

    // half of the dynamic inheritance the other half goes on
    // within the pattern's constructor itself
    __constructor.prototype = extend(
      Object.create(options.constructor.prototype),
      { constructor: options.constructor },
      __constructor.prototype
    );

    const builder = {
      constructor: __constructor,
      publics: options.publics,
      statics: options.statics,
      build() {
        // copy public options into outermost pattern
        extend(__constructor.prototype, options.publics);

        // extend constructor with static props
        return extend(__constructor, options.statics);
      }
    };

    return builder;
  };
}
