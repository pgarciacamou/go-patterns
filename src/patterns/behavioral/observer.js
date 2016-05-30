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

class Observer {
  constructor(fn, subject) {
    this.update = fn;
    this.subject = subject;
  }
  destroy() {
    this.subject.removeObserver(this);
  }
}

var subjects = {};
export default function observer(subject, update) {
  var sub = subjects[subject] = subjects[subject] || new Subject(subject);
  var obs = new Observer(update, sub);
  sub.addObserver(obs);
  return obs;
}
observer.notify = function(subject, data) {
  var sub = subjects[subject];
  if(sub) {
    sub.notify(data);
  }
};
