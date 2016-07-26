export default function createObservable(obj, callback) {
  var getset = {};
  var values = {};
  var isFinalized = false;
  for(let prop in obj) {
    Object.defineProperty(getset, prop, {
      get: _ => values[prop],
      set: newValue => {
        if(newValue === values[prop]) {
          return values[prop];
        }
        if(isFinalized) {
          callback(prop, newValue, values[prop]);
        }
        return values[prop] = newValue;
      }
    });
    getset[prop] = obj[prop];
  }
  isFinalized = true;
  return getset;
};