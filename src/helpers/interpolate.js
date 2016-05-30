function interpolate(str, ...args){
  args.forEach(function (item, index) {
    var search = "$" + (index + 1);
    str = str.split(search).join(item);
  });
  return str;
}

export default interpolate;