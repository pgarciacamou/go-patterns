import extend from '../../helpers/extend.js';
import buildPattern from '../../helpers/buildPattern.js';


export default buildPattern(options => {
  function ChainOfResponsibility(...args) {
    this.chain = [];
    this.run = this.run.bind(this);
    options.constructor.apply(this, args);
  }
  extend(ChainOfResponsibility.prototype, {
    add(fn) {
      if(!this.contains(fn)) {
        this.chain.unshift(fn);
      }
      return this;
    },

    run(...args) {
      for (var i = 0; i < this.chain.length; i++) {
        let next = false;
        let val = this.chain[i].apply(null, [_ => {
          next = true;
        }].concat(args));
        if(!next) {
          return val;
        }
      }
    },

    count() {
      return this.chain.length();
    },

    contains(fn) {
      return this.chain.indexOf(fn) > -1;
    }
  });
  return ChainOfResponsibility;
});

// class ChainOfResponsibility {
//   constructor(heuristic) {
//     this.heuristic = heuristic;
//     this.chain = [];
//   }
//   overload(link) {
//     this.chain.unshift(link);
//   }
//   find(args) {
//     var argsLength = args.length;
//     for(let i = 0; i < argsLength; i++) {
//       let link = this.chain[i];
//       if(link.heuristics.forEach) {
//         let found = true;
//         let heuristicsLength = link.heuristics.length;
//         if(heuristicsLength !== argsLength) { continue; }
//         for(let j = 0; j < heuristicsLength; j++) {
//           if(!link.heuristics[j](args[j])) {
//             found = false;
//           }
//         }
//         if(found) { return link.callback; }
//       } else {
//         if(link.heuristics.apply(link.callback, args)) {
//           return link.callback;
//         }
//       }
//     }
//     return () => { throw new Error("chained callback not found"); }
//   }
// }

// /**
//  * @return {Function} chain
//  */
// export default extend(() => {
//   var cOR = new ChainOfResponsibility();
//   return extend((...args) => {
//     cOR.find(args).apply(this, args);
//   }, {
//     /**
//      * @method
//      *
//      * @param {Function} callback will be added to the top of the chain.
//      * @param {[Array, Function]} heuristics array of functions per argument
//      *                            or single function that will receive the 
//      *                            arguments passed to the original function.
//      */
//     addLink(callback, heuristics = []) {
//       cOR.overload({ callback, heuristics });
//       return this;
//     }
//   });
// }, {
//   heuristics: {
//     isTypeOf(type) {
//       return logicalFunction((arg) => {
//         return typeof arg === type;
//       });
//     },
//     isInstanceOf(constructor) {
//       return logicalFunction((arg) => {
//         return arg instanceof constructor;
//       });
//     },
//     implementsInterface(methodsArray) {
//       return logicalFunction((instance) => {
//         for(let i = 0; i < methodsArray.length; i++) {
//           if(!(methodsArray[i] in instance)) { return false; }
//         }
//         return true;
//       });
//     }
//   }
// });
