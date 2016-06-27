import extend from "../../helpers/extend.js";

/**
 * @method
 * @public
 *
 * applies an Observer pattern to a constructor.
 *
 * @param {String} subject name
 */
function observer(options) {
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
  function Observer() {
    this.subjects = {};
  }
  Observer.prototype = extend(
    Object.create(options.constructor.prototype),
    {
      constructor: options.constructor,

      /**
       * @method
       * @public
       *
       * @param {Function} callback
       */
      add(subject, callback) {
        var subjectContainer = this._getSubject(subject);
        if(subjectContainer.indexOf(callback) === -1) {
          subjectContainer.push(callback);
        }
        return this;
      },

      /**
       * @method
       * @public
       *
       * @param {Function} callback
       */
      remove(subject, callback) {
        var subjectContainer = this._getSubject(subject);
        var index = subjectContainer.indexOf(callback);
        if(index > -1) {
          subjectContainer.splice(index, 1);
        }
        return this;
      },

      /**
       * @method
       * @public
       *
       * @param {DataSet} data sent to every callback
       */
      notify(subject, ...data) {
        var subjectContainer = this._getSubject(subject);
        subjectContainer.forEach(callback => { callback(...data); });
        return this;
      },

      /**
       * counts the amount of observers for a given subject
       * @param  {String} subject
       * @return {Number}         observer count
       */
      count(subject) {
        return this._getSubject(subject).length;
      },

      /**
       * @private method that makes sure a subject exists
       * @param  {String} subject
       * @return {Array}          subject container
       */
      _getSubject(subject) {
        return this.subjects[subject] = this.subjects[subject] || [];
      }

    },
    options.publics
  );

  return {
    constructor: Observer,
    publics: Observer.prototype,
    statics: options.statics,
    build() {
      return extend(Observer, options.statics);
    }
  };
}

export default observer;
