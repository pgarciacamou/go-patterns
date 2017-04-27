var patterns = require("go-patterns");

var Singleton = patterns.singleton().build();
console.log(new Singleton() === new Singleton()); // true
