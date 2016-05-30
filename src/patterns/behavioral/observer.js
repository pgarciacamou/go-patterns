/**
 * @class
 *
 * A way of notifying change to a number of classes to ensure consistency between the classes.
 *
 * @param {Function} update which will be executed when notified.
 * @param {Subject} subject which allows to have access to the subject that holds the observer.
 */
class Observer {
  constructor(update, subject) {
    this.update = update;
    this.subject = subject;
  }

  /**
   * @method
   * @public
   * 
   * removes the obsever from the subject's list.
   */
  destroy() {
    this.subject.removeObserver(this);
  }
}

/**
 * @class
 * @private
 *
 * creates an instance that will manage the list of observers.
 */
class ObserverList {
  constructor() {
    this._list = [];
  }
  add(observer) {
    this._list.push(observer);
  }
  remove(observer) {
    this._list.splice(this.indexOf(observer), 1);
  }
  count() {
    return this._list.length;
  }
  get(index) {
    return this._list[index];
  }
  indexOf(observer) {
    this._list.indexOf(observer);
  }
}

/**
 * @class
 * @private
 *
 * allows observers to subscribe to a subject (instance of Subject).
 */
class Subject {
  constructor(name) {
    this.name = name;
    this._observers = new ObserverList();
  }
  addObserver(observer) {
    this._observers.add(observer);
  }
  removeObserver(observer) {
    this._observers.remove(observer);
  }
  notify(data) {
    var observerCount = this._observers.count();
    for(var i=0; i < observerCount; i++){
      this._observers.get(i).update(data);
    }
  }
}


var subjects = {};

/**
 * @method
 * @public
 *
 * @param {String} subject name
 * @param {Function} update callback
 *
 * @return {Observer} obs instance that allows destruction
 */
export default function observer(subject, update) {
  var sub = subjects[subject] = subjects[subject] || new Subject(subject);
  var obs = new Observer(update, sub);
  sub.addObserver(obs);
  return obs;
}

/**
 * @method
 * @public
 * @static
 *
 * will trigger the subject to notify the observers.
 *
 * @param {String} subject name
 * @param {Object} data sent to observers
 */
observer.notify = function(subject, data) {
  var sub = subjects[subject];
  if(sub) {
    sub.notify(data);
  }
};
