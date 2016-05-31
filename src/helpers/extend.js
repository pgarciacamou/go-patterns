/** 
 * @method
 * 
 * extends an object from a set of objects of 1 or more.
 */
export default (dest, ...srcs) => {
  srcs.forEach(function (src) {
    for(var prop in src) {
      if(src.hasOwnProperty(prop)) {
        dest[prop] = src[prop];
      }
    }
  });

  return dest;
};