import extend from "./extend.js";

// NOT DONE YET.
// What's missing is a way to integrate the arguments
// for each class.
function recursiveInheritanceAux(first, ...__classes) {
  if(__classes.length === 0) { return first; }
  var __super = recursiveInheritanceAux(...__classes);
  first.prototype = extend(
    Object.create(__super.prototype),
    { constructor: first },
    first.prototype
  );
  return first;
}

function recursiveInheritance(...__classes) {
  var __super = recursiveInheritanceAux(...__classes);
  function RecursiveInheritance (...args) {
    __classes.forEach(function (c, index) {
      // THIS IS WHAT IS NOT REALLY CLICKING:
      // args[index] ?????
      c.apply(this, args[index]);
    }.bind(this));
  };
  RecursiveInheritance.prototype = extend(
    Object.create(__super.prototype),
    { RecursiveInheritance: RecursiveInheritance },
    RecursiveInheritance.prototype
  );
  return RecursiveInheritance;
}

// // NOT DONE YET.
// // What's missing is a way to integrate the arguments
// // for each class.
// function recursiveInheritanceAux(first, ...__classes) {
//   if(__classes.length === 0) { return first; }
//   var __super = recursiveInheritanceAux(...__classes);
//   first.prototype = extend(
//     Object.create(__super.prototype),
//     { constructor: first },
//     first.prototype
//   );
//   return first;
// }

// function recursiveInheritance(...__classes) {
//   var __super = recursiveInheritanceAux(...__classes);
//   function RecursiveInheritance (...args) {
//     __classes.forEach(function (c, index) {
//       // THIS IS WHAT IS NOT REALLY CLICKING:
//       // args[index] ?????
//       c.apply(this, args[index]);
//     }.bind(this));
//   };
//   RecursiveInheritance.prototype = extend(
//     Object.create(__super.prototype),
//     { RecursiveInheritance: RecursiveInheritance },
//     RecursiveInheritance.prototype
//   );
//   return RecursiveInheritance;
// }

export default recursiveInheritance;