# go-patterns
JavaScript Design-Patterns Builder

### Background

go-patterns is a tool that builds **design** patterns _on the fly_. The original idea was to create a library that could allow an easy access to inherit/inject patterns into the code without having to worry much about the actual implementation. Due to the complexity of a lot of patterns and some restrictions on ES6, it mutated into an API built around the builder pattern which dynamically creates patterns using JavaScript.

The overhead, file size, and footprint of this library is intended to be very small, thus most of the patterns are simplified/abstracted to a heavy extent. Abstracting the patterns was curcial as it increased the flexibility of the library, allowed to wrap patterns on top of other patterns, and made patterns compatible with the library's pre-designed API.

In order to get the patterns working correctly I was thoroughly guided by the book [Essential JS Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/). There are lots of more complex patterns in this book (e.g. MVVM, MVP, ...) that are missing from this library. Some patterns I'm working on, some I don't really have time to implement, and some others are very hard to abstract to make it compatible with the API. Don't worry, I plan to update it as I can and, as always, PRs are welcomed.

### When To Use

I recommend using this library to quickly build code around design patterns but only as proof of concepts (POC). Once the POC is finalized, I strongly suggest moving away from this library and add more robust pattern implementations as they could be optimized/improved based on your project's requirements. Also, keep in mind that this library uses some techniques (e.g. dynamyc inheritance) that are, most likely, considered bad practices as they could have side effects but, thanks to my experience working with JavaScript, I was able to work around them.

### How To Use

NOTE: if you really need to see how to use a specific pattern, please check the unit tests in `specs/`. You can see more complex examples like patterns wrapped around patters.

A simple example is the singleton, which the idea behind it is that you can only create a single instance from a class.

```js
import patterns from 'go-patterns';

function MySingletonConstructor() {
  this.test = 'testing';
}

var Singleton = patterns.singleton({
  constructor: MySingletonConstructor
}).build();

var singleton1 = new Singleton();
var singleton2 = new Singleton();

console.log(singleton1.test); // 'testing'
console.log(singleton1 === singleton2); // true
console.log(singleton2 instanceof Singleton); // true
console.log(singleton2 instanceof MySingletonConstructor); // true
```
