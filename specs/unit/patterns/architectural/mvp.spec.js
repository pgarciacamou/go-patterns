import { Model, View, Presenter } from "../../../../src/patterns/architectural/mvp.js";

describe('architectural: mvp', function() {
  var model;
  var view;
  var presenter;
  beforeEach(function() {
    model = Model().build();
    view = View().build();
    presenter = Presenter().build();


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