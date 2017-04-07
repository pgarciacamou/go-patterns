# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- Introduced CHANGELOG.md into project.

### Fixed
- Library had dependencies listed but are only used for development.

### Changed
- Source and distribution files were renamed from index/bundle to library name.
- Unit tests are now testing the library's root index.js file instead of an inner file.

## [1.0.1](https://github.com/pgarciacamou/go-patterns/releases/tag/v1.0.1) - 2017-04-04
### Fixed
- Index.js module added to root directory.

## [1.0.0](https://github.com/pgarciacamou/go-patterns/releases/tag/v1.0.0) - 2017-04-03
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
