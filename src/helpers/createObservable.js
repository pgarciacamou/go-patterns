export default function createObservable(obj, callback) {
  var getset = {};
  var values = {};
  var isFinalized = false;
  for(let prop in obj) {
    Object.defineProperty(getset, prop, {
      get: function() {
        return values[prop];
      },
      set: function(val) {
        if(val === values[prop]) {
          return val;
        }
        if(isFinalized) {
          callback(prop, val, values[prop]);
        }
        return values[prop] = val;
      }
    });
    getset[prop] = obj[prop];
  }
  isFinalized = true;
  return getset;
};