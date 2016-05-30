function defaultProperties( ...defaults ){
  var ret = defaults.shift();
  defaults.forEach(function (obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        ret[prop] = obj[prop]
      }
    }
  });
  return ret;
}

function defineProperty( obj, key, value, config ){
  config = defaultProperties({
    value: value,
    writable: true,
    enumerable: true,
    configurable: true
  }, config);
  Object.defineProperty( obj, key, config );
}

export { defaultProperties, defineProperty };
