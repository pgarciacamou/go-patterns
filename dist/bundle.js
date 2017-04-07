(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.patterns = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./src/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _index2.default;

},{"./src/index.js":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPatternBuilder;

var _extend = require('./extend.js');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPatternBuilder(getPattern) {
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    options = (0, _extend2.default)({
      constructor: function constructor() {},
      publics: {},
      statics: {}
    }, options);

    var __class = getPattern(options);
    __class.prototype = (0, _extend2.default)(Object.create(options.constructor.prototype), { constructor: options.constructor }, __class.prototype, options.publics);

    return {
      constructor: __class,
      publics: __class.prototype,
      statics: options.statics,
      build: function build() {
        return (0, _extend2.default)(__class, options.statics);
      }
    };
  };
}

},{"./extend.js":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (dest) {
  for (var _len = arguments.length, srcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcs[_key - 1] = arguments[_key];
  }

  srcs.forEach(function (src) {
    for (var prop in src) {
      if (src.hasOwnProperty(prop)) {
        dest[prop] = src[prop];
      }
    }
  });

  return dest;
};

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// This is an intermediary library used to ease testing.
exports.default = {
  stringify: JSON.stringify.bind(JSON),
  parse: JSON.parse.bind(JSON)
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _singleton = require('./patterns/creational/singleton.js');

var _singleton2 = _interopRequireDefault(_singleton);

var _factory = require('./patterns/creational/factory.js');

var _factory2 = _interopRequireDefault(_factory);

var _publishSubscribe = require('./patterns/behavioral/publishSubscribe.js');

var _publishSubscribe2 = _interopRequireDefault(_publishSubscribe);

var _chainOfResponsibility = require('./patterns/behavioral/chainOfResponsibility.js');

var _chainOfResponsibility2 = _interopRequireDefault(_chainOfResponsibility);

var _mediator = require('./patterns/behavioral/mediator.js');

var _mediator2 = _interopRequireDefault(_mediator);

var _command = require('./patterns/behavioral/command.js');

var _command2 = _interopRequireDefault(_command);

var _memento = require('./patterns/behavioral/memento.js');

var _memento2 = _interopRequireDefault(_memento);

var _flyweight = require('./patterns/structural/flyweight.js');

var _flyweight2 = _interopRequireDefault(_flyweight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var patterns = {
  singleton: _singleton2.default,
  factory: _factory2.default,
  publishSubscribe: _publishSubscribe2.default,
  chainOfResponsibility: _chainOfResponsibility2.default,
  mediator: _mediator2.default,
  command: _command2.default,
  memento: _memento2.default,
  flyweight: _flyweight2.default
};

exports.default = patterns;

},{"./patterns/behavioral/chainOfResponsibility.js":6,"./patterns/behavioral/command.js":7,"./patterns/behavioral/mediator.js":8,"./patterns/behavioral/memento.js":9,"./patterns/behavioral/publishSubscribe.js":10,"./patterns/creational/factory.js":11,"./patterns/creational/singleton.js":12,"./patterns/structural/flyweight.js":13}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extend = require('../../helpers/extend.js');

var _extend2 = _interopRequireDefault(_extend);

var _createPatternBuilder = require('../../helpers/createPatternBuilder.js');

var _createPatternBuilder2 = _interopRequireDefault(_createPatternBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createPatternBuilder2.default)(function (options) {
  function ChainOfResponsibility() {
    this.chain = [];
    this.run = this.run.bind(this);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    options.constructor.apply(this, args);
  }
  (0, _extend2.default)(ChainOfResponsibility.prototype, {
    add: function add(fn) {
      if (!this.contains(fn)) {
        this.chain.unshift(fn);
      }
      return this;
    },
    run: function run() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      for (var i = 0; i < this.chain.length; i++) {
        var next = false;
        var val = this.chain[i].apply(null, [function () {
          next = true;
        }].concat(args));
        if (!next) {
          return val;
        }
      }
    },
    count: function count() {
      return this.chain.length;
    },
    contains: function contains(fn) {
      return this.chain.indexOf(fn) > -1;
    }
  });
  return ChainOfResponsibility;
});

},{"../../helpers/createPatternBuilder.js":2,"../../helpers/extend.js":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extend = require('../../helpers/extend.js');

var _extend2 = _interopRequireDefault(_extend);

var _createPatternBuilder = require('../../helpers/createPatternBuilder.js');

var _createPatternBuilder2 = _interopRequireDefault(_createPatternBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createPatternBuilder2.default)(function (options) {
  function Command() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    options.constructor.apply(this, args);
  }
  (0, _extend2.default)(Command.prototype, {
    execute: function execute(method) {
      if (this[method]) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        return this[method].apply(this, args);
      }
    }
  });
  return Command;
});

},{"../../helpers/createPatternBuilder.js":2,"../../helpers/extend.js":3}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extend = require('../../helpers/extend.js');

var _extend2 = _interopRequireDefault(_extend);

var _createPatternBuilder = require('../../helpers/createPatternBuilder.js');

var _createPatternBuilder2 = _interopRequireDefault(_createPatternBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createPatternBuilder2.default)(function (options) {
  function Mediator() {
    this.participants = {};

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    options.constructor.apply(this, args);
  }
  (0, _extend2.default)(Mediator.prototype, {
    register: function register(alias, callback) {
      if (this.participants[alias] !== undefined) {
        throw new Error('participant already exists');
      }
      this.participants[alias] = callback;
      return this;
    },
    send: function send(message, from, to) {
      if (to === undefined) {
        return this.broadcast(message, from);
      }
      this.participants[to] && this.participants[to](message, from);
      return this;
    },
    broadcast: function broadcast(message, from) {
      for (var prop in this.participants) {
        if (this.participants.hasOwnProperty(prop)) {
          this.participants[prop](message, from);
        }
      }
      return this;
    },
    count: function count() {
      return Object.keys(this.participants).length;
    }
  });
  return Mediator;
});

},{"../../helpers/createPatternBuilder.js":2,"../../helpers/extend.js":3}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extend = require('../../helpers/extend.js');

var _extend2 = _interopRequireDefault(_extend);

var _createPatternBuilder = require('../../helpers/createPatternBuilder.js');

var _createPatternBuilder2 = _interopRequireDefault(_createPatternBuilder);

var _json = require('../../helpers/json.js');

var _json2 = _interopRequireDefault(_json);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createPatternBuilder2.default)(function (options) {
  function Memento() {
    this.mementos = [];

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    options.constructor.apply(this, args);
  }
  (0, _extend2.default)(Memento.prototype, {
    add: function add(memento) {
      this.mementos.push(_json2.default.stringify(memento));
      return this.mementos.length - 1;
    },
    get: function get(index) {
      return _json2.default.parse(this.mementos[index]);
    }
  });
  return Memento;
});

},{"../../helpers/createPatternBuilder.js":2,"../../helpers/extend.js":3,"../../helpers/json.js":4}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extend = require('../../helpers/extend.js');

var _extend2 = _interopRequireDefault(_extend);

var _createPatternBuilder = require('../../helpers/createPatternBuilder.js');

var _createPatternBuilder2 = _interopRequireDefault(_createPatternBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createPatternBuilder2.default)(function (options) {
  function PublishSubscribe() {
    this.topics = {};

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    options.constructor.apply(this, args);
  }

  (0, _extend2.default)(PublishSubscribe.prototype, {
    subscribe: function subscribe(topic, callback) {
      var topicSubscribers = this._getSubscribers(topic);
      if (topicSubscribers.indexOf(callback) === -1) {
        topicSubscribers.push(callback);
      }
      return this;
    },
    unsubscribe: function unsubscribe(topic, callback) {
      var topicSubscribers = this._getSubscribers(topic);
      var index = topicSubscribers.indexOf(callback);
      if (index > -1) {
        topicSubscribers.splice(index, 1);
      }
      return this;
    },
    publish: function publish(topic) {
      for (var _len2 = arguments.length, data = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        data[_key2 - 1] = arguments[_key2];
      }

      var topicSubscribers = this._getSubscribers(topic);
      topicSubscribers.forEach(function (callback) {
        callback.apply(undefined, data);
      });
      return this;
    },
    count: function count(topic) {
      return this._getSubscribers(topic).length;
    },
    _getSubscribers: function _getSubscribers(topic) {
      return this.topics[topic] = this.topics[topic] || [];
    }
  });

  return PublishSubscribe;
});

},{"../../helpers/createPatternBuilder.js":2,"../../helpers/extend.js":3}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extend = require('../../helpers/extend.js');

var _extend2 = _interopRequireDefault(_extend);

var _createPatternBuilder = require('../../helpers/createPatternBuilder.js');

var _createPatternBuilder2 = _interopRequireDefault(_createPatternBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createPatternBuilder2.default)(function (options) {
  function Factory() {
    this.__classes = {};

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    options.constructor.apply(this, args);
  }

  (0, _extend2.default)(Factory.prototype, {
    add: function add(className, __class) {
      if (this.__classes[className] !== undefined) {
        throw new Error('class is already defined in factory');
      }
      this.__classes[className] = __class;
      return this;
    },
    create: function create(className) {
      if (this.__classes[className] === undefined) {
        throw new Error('class is not defined in factory');
      }

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return new (Function.prototype.bind.apply(this.__classes[className], [null].concat(args)))();
    }
  });

  return Factory;
});

},{"../../helpers/createPatternBuilder.js":2,"../../helpers/extend.js":3}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extend = require('../../helpers/extend.js');

var _extend2 = _interopRequireDefault(_extend);

var _createPatternBuilder = require('../../helpers/createPatternBuilder.js');

var _createPatternBuilder2 = _interopRequireDefault(_createPatternBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createPatternBuilder2.default)(function (options) {
  var instance;

  function Singleton() {
    if (instance !== undefined) {
      return instance;
    }

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    options.constructor.apply(this, args);
    return instance = this;
  }

  (0, _extend2.default)(Singleton.prototype, {
    destroy: function destroy() {
      instance = undefined;
    }
  });

  return Singleton;
});

},{"../../helpers/createPatternBuilder.js":2,"../../helpers/extend.js":3}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extend = require('../../helpers/extend.js');

var _extend2 = _interopRequireDefault(_extend);

var _createPatternBuilder = require('../../helpers/createPatternBuilder.js');

var _createPatternBuilder2 = _interopRequireDefault(_createPatternBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createPatternBuilder2.default)(function (options) {
  function Flyweight() {
    this.flyweights = {};

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    options.constructor.apply(this, args);
  }
  (0, _extend2.default)(Flyweight.prototype, {
    create: function create() {
      return this.heuristic.apply(this, arguments);
    },
    heuristic: function heuristic() {
      throw new Error('Flyweight is missing heuristic public method.');
    }
  });
  return Flyweight;
});

},{"../../helpers/createPatternBuilder.js":2,"../../helpers/extend.js":3}]},{},[1])(1)
});