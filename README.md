# go-patterns
JavaScript Design-Patterns Builder

### Installation

1. `npm install --save go-patterns`
2. `import patterns from 'go-patterns';`

### Usage

See [docs](https://github.com/pgarciacamou/go-patterns/wiki) for more patterns and information.

A simple example is the singleton, which the idea behind it is that you can only create a single instance from a class.

```js
import patterns from 'go-patterns';

let Singleton = patterns.singleton().build();

console.log(new Singleton() === new Singleton()) // true
```
