/* globals expect, beforeEach, it, describe, jasmine */
import mediatorBuilder from '../../../../src/patterns/behavioral/mediator.js';

describe('mediator', function() {
  var participantA;
  var participantB;
  var participantC;
  var constructor;
  var Mediator;
  var mediator;
  beforeEach(function() {
    participantA = jasmine.createSpy('A');
    participantB = jasmine.createSpy('B');
    participantC = jasmine.createSpy('B');
    constructor = jasmine.createSpy('constructor');
    Mediator = mediatorBuilder({
      constructor: function(...args) {
        constructor(...args);
      },
      publics: {
        test: 'testing'
      }
    }).build();
    mediator = new Mediator('test');
    mediator.register('participantA', participantA);
    mediator.register('participantB', participantB);
    mediator.send('testA', 'participantB', 'participantA');
    mediator.send('testB', 'participantA', 'participantB');
    mediator.broadcast('broadcast', 'participantA');
    mediator.send('send broadcast', 'participantA');
    mediator.send('anonymous', undefined, 'participantA');
    mediator.send('send anonymous broadcast');
    mediator.broadcast('anonymous broadcast');
    mediator.send('lost', 'participantA', 'non-existant');
    mediator.register('non-existant', participantC);
  });
  it('should allow empty options', function() {
    var emptyOptions = undefined;
    var Mediator = mediatorBuilder(emptyOptions).build();
    var mediator = new Mediator();
    mediator.register('from', (arg) => arg);
    mediator.register('to', (message) => {
      expect(message).toEqual('message');
    });
    mediator.send('message', 'from', 'to');
  });
  it('should wrap with pattern', function() {
    expect(constructor).toHaveBeenCalledWith('test');
    expect(mediator.test).toEqual('testing');
  });
  it('should create a mediator', function() {
    expect(Mediator).toBeDefined();
  });
  it('should register participants', function() {
    expect(mediator.count()).toEqual(3);
  });
  it('should send messages', function() {
    expect(participantA).toHaveBeenCalledWith('testA', 'participantB');
    expect(participantB).toHaveBeenCalledWith('testB', 'participantA');
  });
  it('should be able to broadcast', function() {
    expect(participantA).toHaveBeenCalledWith('broadcast', 'participantA');
    expect(participantB).toHaveBeenCalledWith('broadcast', 'participantA');
    expect(participantA).toHaveBeenCalledWith('send broadcast', 'participantA');
    expect(participantB).toHaveBeenCalledWith('send broadcast', 'participantA');
  });
  it('allows sending anonymous messages', function() {
    expect(participantA).toHaveBeenCalledWith('anonymous', undefined);
    expect(participantA).toHaveBeenCalledWith('send anonymous broadcast', undefined);
    expect(participantA).toHaveBeenCalledWith('anonymous broadcast', undefined);
  });
  it('should dismiss messages for participants not registered on time', function() {
    expect(participantC).not.toHaveBeenCalled();
  });
});
