import singleton from './patterns/creational/singleton.js';
import factory from './patterns/creational/factory.js';
import publishSubscribe from './patterns/behavioral/publishSubscribe.js';
import chainOfResponsibility from './patterns/behavioral/chainOfResponsibility.js';
import mediator from './patterns/behavioral/mediator.js';
import command from './patterns/behavioral/command.js';
import memento from './patterns/behavioral/memento.js';
import flyweight from './patterns/structural/flyweight.js';
import mvw from './patterns/architectural/mvw.js';

var patterns = {
  singleton,
  factory,
  publishSubscribe,
  chainOfResponsibility,
  mediator,
  command,
  memento,
  flyweight,
  mvw
};

export default patterns;
