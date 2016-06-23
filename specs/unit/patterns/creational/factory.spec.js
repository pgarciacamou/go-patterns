import factory from "../../../../src/patterns/creational/factory.js";
import singleton from "../../../../src/patterns/creational/singleton.js";

describe('Factory', function() {
  var Car;
  var CarFactory;
  var Honda, Civic, civic;
  var Toyota, Corolla, corolla;
  
  beforeEach(function() {
    Civic = class {
      constructor(year) {
        this.year = year;
      }
    };
    Corolla = class {
      constructor(year) {
        this.year = year;
      }
    };
    CarFactory = factory({
      constructor: function (name) {
        this._name = name;
      },
      publics: {
        test: "test"
      },
      statics: {
        test: "test"
      }
    }).__class();

    Honda = new CarFactory("Honda San Diego");
    Toyota = new CarFactory("Toyota San Diego");

    Honda.add("civic", Civic);
    Toyota.add("corolla", Corolla);

    civic = Honda.create("civic", 2016);
    corolla = Toyota.create("corolla", 2015);
  });
  it('should create a Factory', function() {
    expect(CarFactory).toBeDefined();
    expect(Honda).toBeDefined();
    expect(Toyota).toBeDefined();
    expect(Honda._name).toEqual("Honda San Diego");
    expect(Toyota._name).toEqual("Toyota San Diego");
  });
  it('should inherit the expected functionality', function() {
    expect(civic instanceof Civic).toBeTruthy();
    expect(civic.year).toEqual(2016);
    expect(corolla instanceof Corolla).toBeTruthy();
    expect(corolla.year).toEqual(2015);
  });
  it('should be able to define public properties/functionality', function() {
    expect(Honda.test).toBeDefined();
    expect(Toyota.test).toBeDefined();
  });
  it('should be able to define static properties/functionality', function() {
    expect(CarFactory.test).toBeDefined();
  });

  describe('Mid Level: Singleton Factory', function() {
    var SingletonFactory;
    var Constructor;
    var singletonFactory;
    beforeEach(function() {
      Constructor = function (arg) {
        this.param = arg;
      }
      SingletonFactory = singleton(factory({
        constructor: Constructor
      })).__class();
      singletonFactory = new SingletonFactory("test");
    });
    it('should be a singleton', function() {
      expect(new SingletonFactory() === singletonFactory).toBeTruthy();
    });
    it('should pass the sanity test', function() {
      expect(singletonFactory.param).toEqual("test");
    });
  });

  // describe('Advanced Level: Factory of Factories', function() {
  //   var HondaFactory;
  //   var ToyotaFactory;
  //   var FactoryOfFactories;
  //   var civic;
  //   var accord;
  //   var corolla;
  //   var camry;
  //   beforeEach(function() {
  //     var singletonFactory = fac => {
  //       return singleton(class {
  //         constructor() {
  //           this.__fac = fac;
  //         }
  //       });
  //     };

  //     /**
  //      * I also used a singleton as I only want to return
  //      * a factory once and not multiple new factories.
  //      *
  //      * With this, you can see that the sky is the limit.
  //      * You might not need to have this type of factories,
  //      * but you can scale this idea to something like a
  //      * factory of services, etc.
  //      */
  //     FactoryOfFactories = factory()
  //     .add("HondaFactory", singletonFactory(
  //       factory()
  //       .add("civic", class {
  //         constructor() {
  //           this.name = "civic";
  //           this.brand = "honda";
  //         }
  //       })
  //       .add("accord", class {
  //         constructor() {
  //           this.name = "accord";
  //           this.brand = "honda";
  //         }
  //       })
  //     ))
  //     .add("ToyotaFactory", singletonFactory(
  //       factory()
  //       .add("corolla", class {
  //         constructor() {
  //           this.name = "corolla";
  //           this.brand = "toyota";
  //         }
  //       })
  //       .add("camry", class {
  //         constructor() {
  //           this.name = "camry";
  //           this.brand = "toyota";
  //         }
  //       })
  //     ));

  //     HondaFactory = FactoryOfFactories.create("HondaFactory").__fac;
  //     ToyotaFactory = FactoryOfFactories.create("ToyotaFactory").__fac;

  //     civic = HondaFactory.create("civic");
  //     accord = HondaFactory.create("accord");
  //     corolla = ToyotaFactory.create("corolla");
  //     camry = ToyotaFactory.create("camry");
  //   });
  //   it('should crete the factories', function() {
  //     expect(HondaFactory).toBeDefined();
  //     expect(ToyotaFactory).toBeDefined();
  //   });
  //   it('should have created the cars', function() {
  //     expect(civic.name).toEqual("civic");
  //     expect(civic.brand).toEqual("honda");
  //     expect(accord.name).toEqual("accord");
  //     expect(accord.brand).toEqual("honda");
  //     expect(corolla.name).toEqual("corolla");
  //     expect(corolla.brand).toEqual("toyota");
  //     expect(camry.name).toEqual("camry");
  //     expect(camry.brand).toEqual("toyota");
  //   });
  // });
});