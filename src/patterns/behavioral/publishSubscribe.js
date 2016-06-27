import extend from "../../helpers/extend.js";

/**
 * @method
 * @public
 *
 * applies an Observer pattern to a constructor.
 *
 * @param {String} topic name
 */
function publishSubscribe(options) {
  options = options || {};
  options = extend({
    constructor: function () {},
    publics: {},
    statics: {}
  }, options);

  /**
   * @class
   * @implements method chainable pattern
   *
   * A way of notifying change to a number of classes to ensure consistency between the classes.
   */
  function PublishSubscribe() {
    this.topics = {};
  }
  PublishSubscribe.prototype = extend(
    Object.create(options.constructor.prototype),
    {
      constructor: options.constructor,

      /**
       * @method
       * @public
       *
       * @param {Function} callback
       */
      subscribe(topic, callback) {
        var topicSubscribers = this._getSubscribers(topic);
        if(topicSubscribers.indexOf(callback) === -1) {
          topicSubscribers.push(callback);
        }
        return this;
      },

      /**
       * @method
       * @public
       *
       * @param {Function} callback
       */
      unsubscribe(topic, callback) {
        var topicSubscribers = this._getSubscribers(topic);
        var index = topicSubscribers.indexOf(callback);
        if(index > -1) {
          topicSubscribers.splice(index, 1);
        }
        return this;
      },

      /**
       * @method
       * @public
       *
       * @param {DataSet} data sent to every callback
       */
      publish(topic, ...data) {
        var topicSubscribers = this._getSubscribers(topic);
        topicSubscribers.forEach(callback => { callback(...data); });
        return this;
      },

      /**
       * counts the amount of observers for a given topic
       * @param  {String} topic
       * @return {Number}         observer count
       */
      count(topic) {
        return this._getSubscribers(topic).length;
      },

      /**
       * @private method that makes sure a topic exists
       * @param  {String} topic
       * @return {Array}          topic container
       */
      _getSubscribers(topic) {
        return this.topics[topic] = this.topics[topic] || [];
      }

    },
    options.publics
  );

  return {
    constructor: PublishSubscribe,
    publics: PublishSubscribe.prototype,
    statics: options.statics,
    build() {
      return extend(PublishSubscribe, options.statics);
    }
  };
}

export default publishSubscribe;
