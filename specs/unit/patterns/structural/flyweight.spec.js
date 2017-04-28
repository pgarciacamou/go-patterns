/* globals expect, beforeEach, it, describe, spyOn */
import flyweightBuilder from '../../../../src/patterns/structural/flyweight.js';
import singletonBuilder from '../../../../src/patterns/creational/singleton.js';
import factoryBuilder from '../../../../src/patterns/creational/factory.js';

describe('flyweight', function() {
  var Flyweight;
  var flyweight;
  beforeEach(function() {
    Flyweight = flyweightBuilder({
      publics: {
        heuristic(name, obj) {
          return this.flyweights[name] = this.flyweights[name] || obj;
        }
      }
    }).build();

    flyweight = new Flyweight();
  });
  it('should allow empty options', function() {
    var emptyOptions = undefined;
    var Flyweight = flyweightBuilder(emptyOptions).build();
    var flyweight = new Flyweight();
    flyweight.create('test', {test: 'testing'});
    expect(flyweight.flyweights['test'].test).toEqual('testing');
  });
  it('should throw an error', function() {
    expect(function() {
      var Flyweight = flyweightBuilder().build();
      var flyweight = new Flyweight();
      flyweight.create();
    }).not.toThrowError('Flyweight is missing heuristic public method.');
  });
  it('should create a flyweight object', function() {
    var test = flyweight.create('test', {
      test: 'testing'
    });
    expect(test).toBeDefined();
    expect(test.test).toEqual('testing');
  });
  it('should return a previously created flyweight object', function() {
    flyweight.create('test', {
      test: 'testing'
    });
    var test = flyweight.create('test', {
      test: 'already created'
    });
    expect(test).toBeDefined();
    expect(test.test).toEqual('testing');
    expect(test.test).not.toEqual('already created');
  });

  describe('Mid Level: Memoization with Flyweight', function() {
    var FactorialMemoizationFlyweight;
    var factorialMemoizationFlyweight;
    var factorials;
    beforeEach(function() {
      factorials = [2, 3, 4];
      FactorialMemoizationFlyweight = singletonBuilder(flyweightBuilder({
        publics: {
          heuristic(val) {
            return this.flyweights[val + ''] = this.flyweights[val] || this.factorial(val);
          },
          factorial(val) {
            if(val <= 1) return 1;
            return val * this.factorial(val - 1);
          }
        }
      })).build();
      factorialMemoizationFlyweight = new FactorialMemoizationFlyweight();
      factorials.forEach(factorialMemoizationFlyweight.create.bind(factorialMemoizationFlyweight));
    });
    it('should memoize the values', function() {
      expect(Object.keys(factorialMemoizationFlyweight.flyweights).length).toEqual(factorials.length);
    });
    it('should return memoized values', function() {
      // we spy on factorial method, AFTER the initial values were declared already.
      spyOn(factorialMemoizationFlyweight, 'factorial');
      factorials.forEach(factorialMemoizationFlyweight.create.bind(factorialMemoizationFlyweight));
      expect(factorialMemoizationFlyweight.factorial).not.toHaveBeenCalled();
    });
  });

  describe('Advanced Level: Object Creation', function() {
    var LightObjectCreation;
    var lightObjectCreation;
    beforeEach(function() {
      function HeavyObject(value) {
        this.data = value;
        this.store = [];
        for(var i = 0; i < value; i++) {
          this.store.push(i * Math.random());
        }
      }

      LightObjectCreation = flyweightBuilder({
        constructor() {
          // this overrides the default object.
          this.flyweights = [];
        },
        publics: {
          heuristic(params) {
            return this.find(params) || this.construct(params);
          },
          construct(params) {
            var heavyObject = new HeavyObject(params.data);
            this.flyweights.push(heavyObject);
            return heavyObject;
          },
          find(params) {
            for(var i = 0, l = this.flyweights.length; i < l; i++) {
              if(this.flyweights[i].data === params.data) {
                return this.flyweights[i];
              }
            }
            return null;
          }
        }
      }).build();

      lightObjectCreation = new LightObjectCreation();

      spyOn(lightObjectCreation, 'construct').and.callThrough();

      lightObjectCreation.create({
        data: 13 // dummy specific data
      });
      lightObjectCreation.create({
        data: 13 // dummy specific data
      });
    });
    it('should only construct the object only once.', function() {
      expect(lightObjectCreation.construct).toHaveBeenCalledTimes(1);
    });
  });

  describe('Advanced Level: Book Store', function() {
    var Book;
    var BookFactory;
    var BookStore;
    var bookStore;
    beforeEach(function() {
      Book = function({title, author, genre, pageCount, publisherID, ISBN}) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pageCount = pageCount;
        this.publisherID = publisherID;
        this.ISBN = ISBN;
      };

      BookFactory = factoryBuilder().build();

      BookStore = flyweightBuilder({
        constructor() {
          this.bookFactory = new BookFactory();
          this.bookFactory.add('book', Book);

          // Extrincic Information
          this.bookRecordDatabase = {};
        },
        publics: {
          heuristic(book) {
            return this.flyweights[book.ISBN] = this.flyweights[book.ISBN] || this.bookFactory.create('book', book);
          },
          addBookRecord({id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability}) {
            let book = this.create({title, author, genre, pageCount, publisherID, ISBN});
            this.bookRecordDatabase[id] = {checkoutMember, checkoutDate, dueReturnDate, availability, book};
          },
          updateCheckoutStatus(bookID, newStatus, checkoutDate, checkoutMember, newReturnDate) {
            let record = this.bookRecordDatabase[bookID];
            if(record) {
              record.availability = newStatus;
              record.checkoutDate = checkoutDate;
              record.checkoutMember = checkoutMember;
              record.dueReturnDate = newReturnDate;
            }
          },
          extendCheckoutPeriod(bookID, newReturnDate) {
            let record = this.bookRecordDatabase[bookID];
            record && (record.dueReturnDate = newReturnDate);
          },
          isPastDue(bookID) {
            let record = this.bookRecordDatabase[bookID];
            return record && (new Date()).getTime() > Date.parse(record.dueReturnDate);
          }
        },
        statics: {
          genres: {
            science: 1,
            fiction: 2,
            etc: 3
          }
        }
      }).build();

      bookStore = new BookStore();

      let book = {
        title: 'Learning JavaScript Design Patterns',
        author: 'Addy Osmani',
        genre: BookStore.genres.science,
        pageCount: 254,
        publisherID: 'O\'Reilly Media',
        ISBN: '978-1-4493-3181-8'
      };
      bookStore.addBookRecord({
        id: 1,
        checkoutDate: new Date(),
        checkoutMember: 1,
        dueReturnDate: (() => {
          var date = new Date();
          var days = 5;
          date.setDate(date.getDate() + days);
          return date;
        })(),
        availability: true,
        ...book
      });
      bookStore.addBookRecord({
        id: 2,
        checkoutDate: new Date(),
        checkoutMember: 1,
        dueReturnDate: (() => {
          var date = new Date();
          var days = 5;
          date.setDate(date.getDate() + days);
          return date;
        })(),
        availability: true,
        ...book
      });
    });
    it('should only create a book once.', function() {
      expect(Object.keys(bookStore.flyweights).length).toEqual(1);
    });
  });
});
