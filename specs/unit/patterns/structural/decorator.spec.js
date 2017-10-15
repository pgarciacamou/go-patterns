/* globals expect, beforeEach, it, describe, spyOn */
import decoratorBuilder from '../../../../src/patterns/structural/decorator.js';

describe('decorator', function() {
  var Decorator;
  var decorator;
  beforeEach(function() {
    function Car(name) {
      this.name = name;
    }


    Decorator = decoratorBuilder({
      publics: {
        addTires() {

        }
      }
    }).build();

    decorator = new Decorator();
  });
  it('should allow empty options', function() {
    var emptyOptions = undefined;
    var Decorator = decoratorBuilder(emptyOptions).build();
    var decorator = new Decorator();
    decorator.create('test', {test: 'testing'});
    expect(decorator.flyweights['test'].test).toEqual('testing');
  });
});
