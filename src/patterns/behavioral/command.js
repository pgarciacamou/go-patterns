import extend from '../../helpers/extend.js';
import buildPattern from '../../helpers/buildPattern.js';

export default buildPattern(options => {
  function Command(...args) {
    options.constructor.apply(this, args);
  }
  extend(Command.prototype, {
    execute(method, ...args) {
      if(this[method]) {
        return this[method](...args);
      }
    }
  });
  return Command;
});
