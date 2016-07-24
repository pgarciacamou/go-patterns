import extend from "../../helpers/extend.js";
import buildPattern from "../../helpers/buildPattern.js";

const Model = buildPattern(options => {
  function Model() {}
  return Model;
});
const View = buildPattern(options => {
  function View() {}
  return View;
});
const Presenter = buildPattern(options => {
  function Presenter() {}
  return Presenter;
});

export default { Model, View, Presenter };