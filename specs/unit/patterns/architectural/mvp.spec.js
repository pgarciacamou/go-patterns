import { Model, View, Presenter } from "../../../../src/patterns/architectural/mvp.js";

describe('architectural: mvp', function() {
  var model;
  var view;
  var presenter;
  var init;
  beforeEach(function() {
    model = Model().build();
    view = View().build();
    presenter = Presenter().build();

    presenter.model = model; // ???
    init = {
      test: "testing"
    };

    // XHR
    model.update(init);






    model.update("test", 3); // is this MVVM ???
    // should it be:
    presenter.update(model, {
      test: 3
    });
    // or just:
    presenter.update({
      test: 3
    });
    // ????


  });
});