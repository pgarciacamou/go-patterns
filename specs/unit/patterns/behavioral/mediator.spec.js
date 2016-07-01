import mediator from "../../../../src/patterns/behavioral/mediator.js";

describe('mediator', function() {
  var participantA;
  var participantB;
  var participantC;
  var constructor;
  var Pattern;
  var patternImplementation;

  beforeEach(function() {
    participantA = jasmine.createSpy("A");
    participantB = jasmine.createSpy("B");
    participantC = jasmine.createSpy("B");
    constructor = jasmine.createSpy("constructor");
    Pattern = mediator({
      constructor: function (...args) {
        constructor(...args);
      },
      publics: {
        test: "testing"
      }
    }).build();
    patternImplementation = new Pattern("test");
    patternImplementation.register("participantA", participantA);
    patternImplementation.register("participantB", participantB);
    patternImplementation.send("testA", "participantB", "participantA");
    patternImplementation.send("testB", "participantA", "participantB");
    patternImplementation.broadcast("broadcast", "participantA");
    patternImplementation.send("send broadcast", "participantA");
    patternImplementation.send("anonymous", undefined, "participantA");
    patternImplementation.send("send anonymous broadcast");
    patternImplementation.broadcast("anonymous broadcast");
    patternImplementation.send("lost", "participantA", "non-existant");
    patternImplementation.register("non-existant", participantC);
  });
  it('should wrap with pattern', function() {
    expect(constructor).toHaveBeenCalledWith("test");
    expect(patternImplementation.test).toEqual("testing");
  });
  it('should create a mediator', function() {
    expect(Pattern).toBeDefined();
  });
  it('should register participants', function() {
    expect(patternImplementation.count()).toEqual(3);
  });
  it('should send messages', function() {
    expect(participantA).toHaveBeenCalledWith("testA", "participantB");
    expect(participantB).toHaveBeenCalledWith("testB", "participantA");
  });
  it('should be able to broadcast', function() {
    expect(participantA).toHaveBeenCalledWith("broadcast", "participantA");
    expect(participantB).toHaveBeenCalledWith("broadcast", "participantA");
    expect(participantA).toHaveBeenCalledWith("send broadcast", "participantA");
    expect(participantB).toHaveBeenCalledWith("send broadcast", "participantA");
  });
  it('allows sending anonymous messages', function() {
    expect(participantA).toHaveBeenCalledWith("anonymous", undefined);
    expect(participantA).toHaveBeenCalledWith("send anonymous broadcast", undefined);
    expect(participantA).toHaveBeenCalledWith("anonymous broadcast", undefined);
  });
  it('should dismiss messages for participants not registered on time', function() {
    expect(participantC).not.toHaveBeenCalled();
  });
});