// This is an intermediary library used to ease testing.
export default {
  stringify: JSON.stringify.bind(JSON),
  parse: JSON.parse.bind(JSON)
};
