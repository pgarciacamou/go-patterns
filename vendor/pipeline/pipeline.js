const uniqueID = require("./helpers/uniqueID.js");

/**
 * pipe function
 * @param  {Function} [callback=null] callback to be executed on run
 * @param  {Object}   _pipes          private object to store the callbacks
 * @return {pipe}
 */
let pipe = module.exports = function pipe(callback=null, _pipes={cbs:[]}){
  callback && _pipes.cbs.push(callback);
  return {
    pipe: cb => pipe(cb, _pipes),
    run: res => {
      let cb, i=0;
      while(cb = _pipes.cbs[i++]){
        let temp = cb(res);
        if(temp && temp.pipe) temp.pipe(_ => temp = _).run();
        if(temp === pipe.skip) continue;
        res = temp;
        if(res === pipe.stop) break;
      }
      return res;
    }
  };
};

// COMMANDS
// --------------------

/**
 * stop command
 * when returned through a pipe, the pipeline stops
 * @type {object}
 */
pipe.stop = uniqueID();

/**
 * stop command
 * when returned through a pipe, the pipeline skips
 * the result from the current pipe function.
 * @type {object}
 */
pipe.skip = uniqueID();

// EXTRA FUNCTIONALITY
// --------------------

/**
 * Wraps the execution of a pipe.
 * @param  {Function}         callback receives:
 *      @argument {Function}  run pipe runner
 * @return {pipe}
 */
pipe.pipeline = function(callback) {
  let _pipe = pipe();
  callback(_pipe.run);
  return _pipe;
};

// HELPERS
// --------------------

/**
 * Buffers until numOfItems and restarts the buffer.
 * @param  {Number} [numOfItems=0] length of the buffer
 * @return {Function}
 */
pipe.every = function(numOfItems=0) {
  let buffer = [];
  return _ => {
    buffer.push(_);
    if(buffer.length < numOfItems) return pipe.stop;
    return buffer.splice(0);
  };
};

/**
 * Keeps a continuous buffer with an upperLimit of items.
 * Every time the pipe is 'run', the full buffer will be
 * passed down the pipe.
 * @param  {Number} [upperBoundLimit=100] maximum number of items in the buffer at any given time
 * @return {Function}
 */
pipe.buffer = function(upperBoundLimit=100) {
  let buffer = [];
  return _ => {
    buffer.push(_);
    if(buffer.length > upperBoundLimit) buffer.splice(0,buffer.length - upperBoundLimit);
    return buffer.slice(0);
  };
};

/**
 * Used in conjuction with 'buffer', this static method
 * will return the latest numOfItems in the buffer.
 * @param  {Number} numOfItems number of items to select from the buffer
 * @return {Function}
 */
pipe.latest = function(numOfItems) {
  return _ => {
    return _.slice(-numOfItems);
  };
};

/**
 * This logger is just a helper to print to the console with ease.
 * @param  {String}   [msg]     message to log before values
 * @param  {Function} [process] callback to process data if needed
 * @return {Function}
 */
pipe.log = function(msg, process = _ => _) {
  return _ => {
    let log = [process(_)];
    msg && log.unshift(msg);
    return console.log.apply(console, log);
  };
};
