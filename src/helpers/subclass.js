export default function subclass(__class) {
  // function Singleton() {
  //   if(instance !== undefined) { return instance; }
  //   _Constructor.apply(this, arguments);
  //   return (instance = this);
  // }
  // Singleton.prototype = extend(
  //   Object.create(_Constructor.prototype), 
  //   { constructor: _Constructor }
  // );
  // extend(Singleton, {
  //   super: _Constructor,
  //   destroy: _ => { instance = undefined; }
  // });

  return class extends __class {
    constructor() {
      super();
    }
  };
}