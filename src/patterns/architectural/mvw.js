import extend from '../../helpers/extend.js';
import createPatternBuilder from '../../helpers/createPatternBuilder.js';

export default createPatternBuilder(options => {
  function MVW(...args) {
    this.flyweights = {};
    this.model = {};
    options.constructor.apply(this, args);
  }
  extend(MVW.prototype, {
    add(prop, propOptions={}) {
      let self = this;
      let value;
      
      propOptions = this.model[prop] = {
        shouldModelUpdate() { return true; },
        modelWillUpdate() {},
        modelDidUpdate() {},
        handleViewUpdate() {},
        ...propOptions
      };
      
      Object.defineProperty(propOptions, 'value', {
        set(newValue) {
          if(value !== newValue && propOptions.shouldModelUpdate.call(self, newValue, value)) {
            propOptions.modelWillUpdate.call(self, newValue, value);
            propOptions.modelDidUpdate.call(self, value = newValue);
          }
        },
        get() {
          return value;
        }
      });
      
      propOptions.handleViewUpdate.call(self, value => propOptions.value = value);
      propOptions.value = propOptions.defaultValue;
    }
  });
  return MVW;
});
