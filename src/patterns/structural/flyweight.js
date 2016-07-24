import extend from "../../helpers/extend.js";
import buildPattern from "../../helpers/buildPattern.js";
import factory from "../creational/factory.js";

export default buildPattern(options => {
  function Flyweight(...args) {
    this.flyweights = {};
    options.constructor.apply(this, args);
  }
  extend(Flyweight.prototype, {
    create(...args) {
      return this.heuristic(...args);
    },
    heuristic() {
      throw new Error("Flyweight is missing heuristic public method.");
    }
  });
  return Flyweight;
});