/* globals document, expect, beforeEach, it, describe, spyOn, jasmine */
import mvwBuilder from '../../../../src/patterns/architectural/mvw.js';

function dispatchEvent(element, eventName, eventData) {
  var ev = document.createEvent('Event');
  ev.data = eventData;
  ev.initEvent(eventName, true, true);
  element.dispatchEvent(ev);
}

describe('mvw', function() {
  let MVW;
  let mvw;
  let somePropOptions;
  let updateValueCallback;
  let fakeUpdateView;

  beforeEach(function() {
    MVW = mvwBuilder().build();
    mvw = new MVW();
  });
  it('should allow empty options', function() {
    let emptyOptions = undefined;
    expect(() => new MVW(emptyOptions)).not.toThrow();
  });
  it('should access the mvw instance withing the methods', function() {
    mvw.add('test', {
      default: 1,
      modelDidUpdate() {
        expect(this).toEqual(mvw);
      }
    });
  });

  describe('full options', function() {
    beforeEach(function() {
      somePropOptions = {
        defaultValue: 1,
        shouldModelUpdate(/*newValue, oldValue*/) { return true; },
        modelWillUpdate(/*newValue, oldValue*/) {},
        modelDidUpdate(/*newValue*/) {},
        handleViewUpdate(updateValue) {
          updateValueCallback = updateValue;
          fakeUpdateView = value => updateValue(value);
        }
      };

      spyOn(somePropOptions, 'shouldModelUpdate').and.callThrough();
      spyOn(somePropOptions, 'modelWillUpdate');
      spyOn(somePropOptions, 'modelDidUpdate');
      spyOn(somePropOptions, 'handleViewUpdate').and.callThrough();

      mvw.add('someProp', somePropOptions);
    });

    it('should have add a default value', function() {
      expect(mvw.model.someProp.value).toEqual(1);
    });
    it('should have run shouldModelUpdate method once', function() {
      expect(somePropOptions.shouldModelUpdate).toHaveBeenCalledTimes(1);
      expect(somePropOptions.shouldModelUpdate).toHaveBeenCalledWith(1, undefined);
    });
    it('should have run modelWillUpdate method once', function() {
      expect(somePropOptions.modelWillUpdate).toHaveBeenCalledTimes(1);
      expect(somePropOptions.modelWillUpdate).toHaveBeenCalledWith(1, undefined);
    });
    it('should have run modelDidUpdate method once', function() {
      expect(somePropOptions.modelDidUpdate).toHaveBeenCalledWith(1);
      expect(somePropOptions.modelDidUpdate).toHaveBeenCalledWith(1);
    });
    it('should have run handleViewUpdate', function() {
      expect(somePropOptions.handleViewUpdate).toHaveBeenCalledTimes(1);
      expect(somePropOptions.handleViewUpdate).toHaveBeenCalledWith(updateValueCallback);
    });
    it('should not update value', function() {
      mvw.model.someProp.value = 1;
      expect(somePropOptions.shouldModelUpdate).toHaveBeenCalledTimes(1);
      expect(somePropOptions.modelWillUpdate).toHaveBeenCalledTimes(1);
      expect(somePropOptions.modelDidUpdate).toHaveBeenCalledTimes(1);
    });
    it('should update value', function() {
      mvw.model.someProp.value = 2;
      expect(somePropOptions.modelWillUpdate).toHaveBeenCalledTimes(2);
      expect(somePropOptions.modelWillUpdate).toHaveBeenCalledWith(2, 1);
      expect(somePropOptions.modelDidUpdate).toHaveBeenCalledTimes(2);
      expect(somePropOptions.modelDidUpdate).toHaveBeenCalledWith(2);
    });
    it('should update value on view update', function() {
      fakeUpdateView(3);
      expect(mvw.model.someProp.value).toEqual(3);
    });
  });
  describe('no default value', function() {
    beforeEach(function() {
      somePropOptions = {
        shouldModelUpdate(/*newValue, oldValue*/) { return true; },
        modelWillUpdate(/*newValue, oldValue*/) {},
        modelDidUpdate(/*newValue*/) {},
        handleViewUpdate(/*updateValue*/) {}
      };

      spyOn(somePropOptions, 'shouldModelUpdate').and.callThrough();
      spyOn(somePropOptions, 'modelWillUpdate');
      spyOn(somePropOptions, 'modelDidUpdate');
      spyOn(somePropOptions, 'handleViewUpdate');

      mvw.add('someProp', somePropOptions);
    });

    it('should not have a default value', function() {
      expect(mvw.model.someProp.value).toBeUndefined();
    });
    it('should not have updated model', function() {
      expect(somePropOptions.shouldModelUpdate).not.toHaveBeenCalled();
      expect(somePropOptions.modelWillUpdate).not.toHaveBeenCalled();
      expect(somePropOptions.modelDidUpdate).not.toHaveBeenCalled();
    });
    it('should still call handle view update', function() {
      expect(somePropOptions.handleViewUpdate).toHaveBeenCalled();
    });
  });
  describe('empty options', function() {
    let emptyOptions;
    beforeEach(function() {
      mvw.add('someProp', emptyOptions);
    });
    it('should allow to add methods after', function() {
      mvw.model.someProp.shouldModelUpdate = jasmine.createSpy('shouldModelUpdate').and.returnValue(true);
      mvw.model.someProp.modelWillUpdate = jasmine.createSpy('modelWillUpdate');
      mvw.model.someProp.modelDidUpdate = jasmine.createSpy('modelDidUpdate');
      mvw.model.someProp.value = 1;
      expect(mvw.model.someProp.shouldModelUpdate).toHaveBeenCalled();
      expect(mvw.model.someProp.modelWillUpdate).toHaveBeenCalled();
      expect(mvw.model.someProp.modelDidUpdate).toHaveBeenCalled();
    });
  });

  describe('Advanced Level: DOM element updates', function() {
    let afterValue;
    let beforeValue;
    beforeEach(function() {
      afterValue = 2;
      beforeValue = 1;

      MVW = mvwBuilder({
        constructor: function() {
          this.elem = document.body;
        }
      }).build();
      mvw = new MVW();
      mvw.add('bodyState', {
        defaultValue: 1,
        shouldModelUpdate(newValue/*, oldValue*/) {
          return !isNaN(newValue) && newValue > 0;
        },
        modelWillUpdate(newValue, oldValue) {
          this.elem.classList.remove(`state-${oldValue}`);
          this.elem.classList.add(`state-${newValue}`);
        },
        handleViewUpdate(updateValue) {
          this.elem.addEventListener('mouseenter', () => updateValue(afterValue), false);
          this.elem.addEventListener('mouseleave', () => updateValue(beforeValue), false);
        }
      });
    });
    it('should update value on mouseenter', function() {
      dispatchEvent(document.body, 'mouseenter', {});
      expect(mvw.model.bodyState.value).toEqual(afterValue);
    });
    it('should update value on mouseleave', function() {
      dispatchEvent(document.body, 'mouseleave', {});
      expect(mvw.model.bodyState.value).toEqual(beforeValue);
    });
  });
  describe('Advanced Level: Input value updates', function() {
    let modelWillUpdateSpy;
    let input;
    beforeEach(function() {
      modelWillUpdateSpy = jasmine.createSpy('modelWillUpdateSpy');

      MVW = mvwBuilder({
        constructor: function() {
          this.input = input = document.createElement('input');
        }
      }).build();
      mvw = new MVW();
      mvw.add('name', {
        modelWillUpdate(newValue, oldValue) {
          modelWillUpdateSpy(newValue, oldValue);
          this.input.value = newValue;
        },
        handleViewUpdate(updateValue) {
          this.input.addEventListener('input', () => updateValue(this.input.value), false);
        }
      });
    });
    it('should not have circular updates (infinite loops)', function() {
      input.value = 'update';
      dispatchEvent(input, 'input', {});
      expect(modelWillUpdateSpy).toHaveBeenCalledTimes(1);
      expect(modelWillUpdateSpy).toHaveBeenCalledWith('update', undefined);
    });
  });
});
