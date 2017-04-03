import extend from '../../helpers/extend.js';
import createPatternBuilder from '../../helpers/createPatternBuilder.js';

export default createPatternBuilder(options => {
  function PublishSubscribe(...args) {
    this.topics = {};
    options.constructor.apply(this, args);
  }

  extend(PublishSubscribe.prototype, {
    subscribe(topic, callback) {
      var topicSubscribers = this._getSubscribers(topic);
      if(topicSubscribers.indexOf(callback) === -1) {
        topicSubscribers.push(callback);
      }
      return this;
    },

    unsubscribe(topic, callback) {
      var topicSubscribers = this._getSubscribers(topic);
      var index = topicSubscribers.indexOf(callback);
      if(index > -1) {
        topicSubscribers.splice(index, 1);
      }
      return this;
    },

    publish(topic, ...data) {
      var topicSubscribers = this._getSubscribers(topic);
      topicSubscribers.forEach(callback => { callback(...data); });
      return this;
    },

    count(topic) {
      return this._getSubscribers(topic).length;
    },

    _getSubscribers(topic) {
      return this.topics[topic] = this.topics[topic] || [];
    }
  });

  return PublishSubscribe;
});
