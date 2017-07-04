# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
### Fixed
### Changed

## [v3.0.0](https://github.com/pgarciacamou/go-patterns/releases/tag/v3.0.0) - 2017-07-04
### Added
- Created DEVELOP.md.
- Flyweight pattern now can take in a callback instead of a value.
### Fixed
- Mediator pattern bug participant not found.
- Chain of responsibility behavior changed from LIFO to FIFO.
- Flyweight pattern behavior updated so that `create()` adds the objects instead of `heuristic()`.
### Changed
- Moved documentation from README to wiki.
- Made npm release simple to avoid having documentation.
- Mediator methods now take in a single argument type Object instead of multiple arguments.
- Mediator `send()` will no longer broadcast if the receiver is not found.

## [v2.0.0](https://github.com/pgarciacamou/go-patterns/releases/tag/v2.0.0) - 2017-04-29
### Added
- Include example directory that installs the library and uses it.
- Added .npmignore file to ignore src/ directory.
- Using babel-cli and some related modules to compile for npm usage.
- Introducing MVW pattern.
- Expose createPatternBuilder functionality.
- Now using Travis CI.

### Fixed
- We can now use the library without having to have ES6 features.
- Created a lib/ directory to publish to npm.

### Changed
- Changed package.json "main" to lib/go-patterns.js.
- Modified babel presets and plugins.

## [v1.0.2](https://github.com/pgarciacamou/go-patterns/releases/tag/v1.0.2) - 2017-04-23
### Added
- Introduced CHANGELOG.md into project.

### Fixed
- Library had dependencies listed but are only used for development.
- Flyweight now allows empty options as do the rest of the patterns.

### Changed
- Source and distribution files were renamed from index/bundle to library name.
- Unit tests are now testing the library's root index.js file instead of an inner file.

## [v1.0.1](https://github.com/pgarciacamou/go-patterns/releases/tag/v1.0.1) - 2017-04-04
### Fixed
- Index.js module added to root directory.

## [v1.0.0](https://github.com/pgarciacamou/go-patterns/releases/tag/v1.0.0) - 2017-04-03
### Added
- First release shipped with the following patterns:
  * creational/singleton
  * creational/factory
  * behavioral/publishSubscribe
  * behavioral/chainOfResponsibility
  * behavioral/mediator
  * behavioral/command
  * behavioral/memento
  * structural/flyweight
- Unit tests created using Karma.
