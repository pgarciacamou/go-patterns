/* globals expect, beforeEach, it, describe, jasmine */
import commandBuilder from '../../../../src/patterns/behavioral/command.js';
import chainOfResponsibilityBuilder from '../../../../src/patterns/behavioral/chainOfResponsibility.js';

describe('command', function() {
  var someMethodSpy;
  var Command;
  var command;
  beforeEach(function() {
    someMethodSpy = jasmine.createSpy('someMethod');
    Command = commandBuilder({
      publics: {
        someMethod: someMethodSpy
      }
    }).build();
    command = new Command();
    command.execute('someMethod', 'test');
  });
  it('should execute a command', function() {
    expect(someMethodSpy).toHaveBeenCalledWith('test');
  });
  describe('Advanced Level: Undo Redo', function() {
    var IUndoRedo;
    var implementsInterface;
    var chain;
    var UndoManager;
    var undoManager;
    var PointInTime;
    var runSpy;
    var redoSpy;
    var undoSpy;
    beforeEach(function() {
      PointInTime = function(data) {
        this.data = data;
        this.previous = null;
        this.next = null;
      };

      IUndoRedo = ['run', 'undo', 'redo'];
      implementsInterface = (i, o) => {
        return i.map(_ => o[_] instanceof Function).reduce((a, b) => a && b);
      };
      chain = (...args) => {
        var Chain = chainOfResponsibilityBuilder().build();
        var overloader = new Chain();
        args.forEach(overloader.add.bind(overloader));
        return overloader.run;
      };

      UndoManager = commandBuilder({
        constructor() {
          this.methods = {};
          this.pit = new PointInTime();
          var execute = this.execute.bind(this);
          this.execute = chain(
            (_, ...args) => { execute(...args); },
            this._onExecute.bind(this)
          );
        },
        publics: {
          _onExecute(next, _, ...args) {
            if(_ !== 'run') {
              return this.execute.apply(null, ['run', _].concat(args));
            }
            var pit = new PointInTime(args);
            pit.previous = this.pit;
            this.pit.next = pit;
            this.pit = pit;
            next();
          },
          run(method, ...args) {
            return this.methods[method] && this.methods[method].run(...args);
          },
          add(method, obj) {
            if(!implementsInterface(IUndoRedo, obj)) {
              throw new Error('does not implement IUndoRedo interface.');
            }
            this.methods[method] = obj;
          },
          undo() {
            if(this.pit.previous === null) {
              return;
            }
            var mName = this.pit.data[0];
            var method = this.methods[mName];
            if(method) {
              method.undo.apply(this.pit.data.slice(1));
            }
            this.pit = this.pit.previous;
          },
          redo() {
            if(this.pit.next === null) {
              return;
            }
            this.pit = this.pit.next;
            var mName = this.pit.data[0];
            var method = this.methods[mName];
            if(method) {
              method.redo(this.pit.data.slice(1));
            }
          }
        }
      }).build();
      undoManager = new UndoManager();

      runSpy = jasmine.createSpy('run');
      redoSpy = jasmine.createSpy('redo');
      undoSpy = jasmine.createSpy('undo');
      undoManager.add('test', {
        run: runSpy,
        redo: redoSpy,
        undo: undoSpy
      });
      undoManager.execute('test', 'testing');
      undoManager.undo();
      undoManager.redo();
    });
    it('should run a method', function() {
      expect(runSpy).toHaveBeenCalledWith('testing');
    });
    it('should undo a method', function() {
      expect(undoSpy).toHaveBeenCalled();
    });
    it('should redo a method', function() {
      expect(redoSpy).toHaveBeenCalled();
    });
  });
});
