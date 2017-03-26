import extend from "../../helpers/extend.js";
import buildPattern from "../../helpers/buildPattern.js";
import createCustomObservable from "../../helpers/createCustomObservable.js";
import publishSubscribe from "../behavioral/publishSubscribe.js";

export default buildPattern(options => {
  var PubSub = publishSubscribe().build();
  function MVP(...args){
    this._pubsub = new PubSub();
    options.constructor.apply(this, args);
  }
  extend(MVP.prototype, {
    initModel(obj) {
      this._model = createCustomObservable(obj);
      this._model.__pipeline
      .pipe((prop, newV, oldV) => {
        this._pubsub.publish("prop", newV, oldV);
        return obs.__pipeline.pipe.commands.skip;
      });
    },
    onUpdate(prop, fn) {
      this._pubsub.subscribe(prop, fn);
    }
  });
  return MVP;
});
// const Model = buildPattern(options => {
//   function Model() {}
//   extend(Model.prototype, {
    
//   });
//   return Model;
// });
// const View = buildPattern(options => {
//   function View() {}
//   return View;
// });
// const Presenter = buildPattern(options => {
//   function Presenter(model, view, ...args) {
//     options.constructor.apply(this, args);
//   }
//   return Presenter;
// });

// export default { Model, View, Presenter };