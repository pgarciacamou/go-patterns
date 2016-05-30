var subjects = {};

/**
 * @method
 * @public
 *
 * A way of notifying change to a number of classes to ensure consistency between the classes.
 *
 * @param {String} subject name
 * @param {Function} update callback
 */
export default function observer(subject, update) {
  var sub = subjects[subject] = subjects[subject] || [];
  if(sub.indexOf(update) === -1) {
    sub.push(update);
    return {
      update,
      destroy() {
        sub.splice(sub.indexOf(update), 1);
      }
    };
  }
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
  sub.forEach(function (obs) {
    obs(data);
  });
};
