# patterns
JS Design Pattern Generator

### Background

pattern-builder is a tool that builds **design** patterns _on the fly_. The original idea was to create a library that could allow an easy access to inherit/inject patterns into the code without having to worry much about the actual implementation. Due to the complexity of a lot of patterns and some restrictions on ES6, it mutated into an API built around the builder pattern which dynamically creates patterns using JavaScript.

The overhead, file size, and footprint of this library is intended to be very small, thus most of the patterns are simplified/abstracted to a heavy extent. Abstracting the patterns was curcial as it increased the flexibility of the library, allowed to wrap patterns on top of other patterns, and made patterns compatible with the library's designed API.

In order to get the patterns working correctly I was thoroughly guided by the book [Essential JS Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/). There are lots of more complex patterns in this book (e.g. MVVM, MVP, ...) that are missing from this library. Some patterns I'm working on, some I don't really have time to implement, and some others are very hard to abstract to make it compatible with the API. Don't worry, I plan to update it as I can and, as always, PRs are welcomed.
