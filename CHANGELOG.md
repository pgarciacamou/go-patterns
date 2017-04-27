# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- Include example directory that installs the library and uses it.
- Added .npmignore file to ignore src/ directory.
- Using babel-cli and some related modules to compile for npm usage.

### Fixed
- We can now use the library without having to have ES6 features.
- Created a lib/ directory to publish to npm.

### Changed
- Changed package.json "main" to lib/go-patterns.js.

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
