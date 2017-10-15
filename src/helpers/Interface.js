
export default function Interface(name, methods) {
  this.name = name;
  this.methods = methods;
}

Interface.implements = function (object, { methods }) {
  return Object
    .keys(object)
    .reduce(
      (reduction, prop) => reduction && methods.indexOf(prop) !== -1,
      true
    );
};
