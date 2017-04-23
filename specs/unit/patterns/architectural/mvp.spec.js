import { __model, __view, __presenter } from "../../../../src/patterns/architectural/mvp.js";
import mvp from "../../../../src/patterns/architectural/mvp.js";

xdescribe('architectural: mvp', function() {
  var MVP;
  var mvpInstance;
  var spy;
  beforeEach(function() {
    spy = jasmine.createSpy("spy");

    MVP = mvp().build();
    mvpInstance = new MVP();
    console.log(mvpInstance);
    mvpInstance.onUpdate("test", spy);
    mvpInstance.initModel({
      test: 1
    });

    var model = mvpInstance.model; // ???
    var view = mvpInstance.view; // ???


  });
  it('should behave..', function() {
    expect(spy).toHaveBeenCalled();
  });
  // var Model, View, Presenter;
  // var model, view, presenter;
  // var init;
  // beforeEach(function() {
  //   MVP = __mvp().build();
  //   mvp = new MVP({

  //   })



  //   Model = __model().build();
  //   View = __view().build();
  //   Presenter = __presenter().build();


  //   model = new Model({

  //   });
  //   view = new View({

  //   });
  //   presenter = new Presenter(model, view);

  //   view.onUpdate("prop", function () {
  //     // body...
  //   })
  //   // presenter.onUpdate(view, "prop", )

  //   model.onUpdate(function(newOptions, oldOptions) {

  //   });


  //   init = {
  //     test: "testing"
  //   };

  //   // XHR
  //   model.update(init);






  //   model.update("test", 3); // is this MVVM ???
  //   // should it be:
  //   presenter.update(model, {
  //     test: 3
  //   });
  //   // or just:
  //   presenter.update({
  //     test: 3
  //   });
  //   // ????
  // });
});