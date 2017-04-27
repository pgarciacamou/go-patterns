# go-patterns
JavaScript Design-Patterns Builder

### Background

go-patterns is a tool that builds design patterns _on the **go**_. The original idea was to create a library that could allow an easy access to inherit/inject patterns into the code without having to worry much about the actual implementation. Due to the complexity of a lot of patterns and some restrictions on ES6, it mutated into an API built around the builder pattern, which dynamically creates patterns using JavaScript.

The overhead, file size, and footprint of this library is intended to be very small (currently <15KB [<4KB when gzipped]), thus most of the patterns are simplified/abstracted to a heavy extent. Abstracting the patterns was crucial as it increased the flexibility of the library, allowed to wrap patterns on top of other patterns, and made patterns compatible with the library's pre-designed API.

In order to get the patterns working correctly, I followed —as much as possible— the patterns' implementations from the [Essential JS Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/) book. There are still a lot more patterns in this book that are missing from this library, some patterns I'm working on, some I don't really have time to implement, and some others are very hard to abstract to make it compatible with the API, e.g. I just added the MVW pattern which took a while to abstract to something flexible and usable that didn't consume a lot of computer power.

### When To Use

I recommend using this library to quickly build code around design patterns but only as proof of concept (POC). Once the POC is finalized, I strongly suggest moving away from this library and add more robust pattern implementations, as they could be optimized/improved based on your project's requirements. Also, keep in mind that this library uses some advanced techniques (e.g. dynamic inheritance) that are not part of JavaScript and that are, most likely, considered bad practices as they could have side effects. Rest assure, I have years of experience working with JavaScript and knowing about the side effects I was able to work around them.

### Installation

1. `npm install --save go-patterns` on your project
2. `import patterns from 'go-patterns';`

### Development

1. fork/clone repo
2. install dependencies `npm install`
3. run unit test suites `npm run test`

### Deployment (Publish && Release)

1. Login to NPM: `npm login`
2. Increase library version: `npm version [major|minor|patch]`
3. Upload new tag created on step 2: `git push origin <new tag>`
4. Create distribution files `npm run dist`
5. Create release in GitHub (attach dist/* files created in step 4)
6. Publish: `npm publish`

### How To Use

NOTE: if you really need to see how to use a specific pattern, please check the unit tests in `specs/`. You can see more complex examples like patterns wrapped around patterns.

A simple example is the singleton, which the idea behind it is that you can only create a single instance from a class.

The simplest way to create a singleton is:

```js
import patterns from 'go-patterns';

let Singleton = patterns.singleton().build();

console.log(new Singleton() === new Singleton()) // true
```

A more verbose approach is:

```js
import patterns from 'go-patterns';

function MySingletonConstructor() {
  this.test = 'testing';
}

let options = {
  constructor: MySingletonConstructor,
  // NOTE: you can add public and static methods like:
  publics: {}, // will be attached to the prototype
  statics: {}  // will be attached to the constructor
};

// Note: the options object is completely optional (as seen in the example above).
var Singleton = patterns.singleton(options).build();
var singleton1 = new Singleton();
var singleton2 = new Singleton();

console.log(singleton1.test); // 'testing'
console.log(singleton1 === singleton2); // true
console.log(singleton2 instanceof Singleton); // true
console.log(singleton2 instanceof MySingletonConstructor); // true
```

### How To Add A New Pattern

To add new patterns to this library, take a look at previously created patterns. I use a helper called `createPatternBuilder` which is in charge of 95% of the dynamic inheritance, the other 5% needs to be taken care within the pattern.

`createPatternBuilder` takes in a function that needs to return the pattern's constructor. With this, `createPatternBuilder` will then return a "_builder_" object which will either extend the pattern's constructor when the pattern is built, or use to wrap around other patterns. This is the core functionality of this library and it is exactly why the patterns need to be abstracted to work with this.

For example, let's create a pattern that for some reason returns a random unrepeated integer from 0 to 100, but this pattern can be extended to also update those limits:

```js
// Pattern Definition
let unrepeatedNumbersBuilder = createPatternBuilder(options => {
  function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  function UnrepeatedNumbers(...args) {
    options.constructor.apply(this, args);
    this._prevNumbers = [];
    for(let lB = this.lowerBound, uB = this.upperBound; lB <= uB; lB++) {
      this._prevNumbers.push(lB);
    }
  }

  extend(UnrepeatedNumbers.prototype, {
    lowerBound: 0,
    upperBound: 100,
    genNumber() {
      if(this._prevNumbers.length === 0) {
        return null;
      }

      let index = randomIntFromInterval(0, this._prevNumbers.length - 1);
      return this._prevNumbers.splice(index, 1)[0];
    }
  });

  return UnrepeatedNumbers;
});

// How to build the pattern.
let UnrepeatedNumbers = unrepeatedNumbersBuilder({
  // We can also see how to extend it.
  constructor: function(lowerBound=this.lowerBound, upperBound=this.upperBound) {
    this.lowerBound = lowerBound;
    this.upperBound = upperBound;
  }
}).build();

// How to use it:
let A = new UnrepeatedNumbers(2, 5);
let B = new UnrepeatedNumbers();

console.log(A.genNumber()); // unrepeated random number #1
console.log(A.genNumber()); // unrepeated random number #2
console.log(A.genNumber()); // unrepeated random number #3
console.log(A.genNumber()); // unrepeated random number #4
console.log(A.genNumber()); // null (out of numbers)

console.log(B.genNumber()); // unrepeated random number from 0 to 100
```

NOTE: Don't forget to add the respective unit tests for quality purposes.
