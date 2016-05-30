var subjects = {};

/**
 * @class
 * @implements method chainable pattern
 *
 * A way of notifying change to a number of classes to ensure consistency between the classes.
 *
 * @param {String} subject name
 * @param {Function} update callback
 */
class Observer {
  constructor(subject) {
    this.list = [];
    this.subject = subject;
  }

  /**
   * @method
   * @public
   *
   * @param {Function} update callback
   */
  add(update) {
    if(this.list.indexOf(update) === -1) {
      this.list.push(update);
    }
    return this;
  }

  /**
   * @method
   * @public
   *
   * @param {Function} update callback
   */
  remove(update) {
    this.list.splice(this.list.indexOf(update), 1);
    return this;
  }

  /**
   * @method
   * @public
   *
   * @param {DataSet} data sent to every update
   */
  notify(...data) {
    this.list.forEach(update => { update(...data); });
    return this;
  }
}

/**
 * @method
 * @public
 *
 * creates an Observer for a specific subject.
 *
 * @param {String} subject name
 */
export default function observer(subject) {
  if(subjects[subject]) { return subjects[subject]; }
  return subjects[subject] = new Observer(subject);
}
