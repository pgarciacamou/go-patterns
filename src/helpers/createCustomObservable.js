var pipe = require("pipeline");

export default function createCustomObservable(obj) {
  var __pipeline = pipe();
  var getset = {
    __pipeline, __isCustomObservable: true
  };
  let values = {};
  let isFinalized = false;
  
  for(let prop in obj) {
    if(obj[prop].__isCustomObservable) {
      obj[prop].__pipeline.pipe(changes => {
        changes[0] = prop + "." + changes[0];
        getset.__pipeline.run(changes)
      });
    } else {
      Object.defineProperty(getset, prop, {
        get: _ => values[prop],
        set: newValue => {
          if(newValue === values[prop]) {
            return values[prop];
          }
          let oldValue = values[prop];
          values[prop] = newValue;
          isFinalized && getset.__pipeline.run([prop, values[prop], oldValue]);
          return values[prop];
        }
      });
    }
    getset[prop] = obj[prop];
  }
  isFinalized = true;
  return getset;
};