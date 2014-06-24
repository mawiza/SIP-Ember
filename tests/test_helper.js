// Generated by CoffeeScript 1.7.1
(function() {
  before(function() {
    App.ApplicationAdapter = DS.FixtureAdapter({
      simulateRemoteResponse: false
    });
    App.ApplicationStore = DS.Store.extend({
      adapter: DS.FixtureAdapter
    });
    Ember.Test.adapter = Ember.Test.MochaAdapter.create();
    App.setupForTesting();
    App.injectTestHelpers();
    return Ember.Notify.reopen({
      timeout: 500
    });
  });

  beforeEach(function() {
    Ember.run(function() {
      App.reset();
    });
    Ember.testing = true;
  });

  afterEach(function() {
    Ember.testing = false;
  });

  Ember.Test.registerAsyncHelper("assertNavbarLink", function(app, value) {
    visit("/");
    andThen(function() {
      var $el;
      if (value !== '') {
        $el = findWithAssert('.' + value + '-link');
      } else {
        $el = findWithAssert('.title-link');
      }
      click($el);
      return expect(currentURL()).to.equal('/' + value);
    });
  });

}).call(this);

//# sourceMappingURL=test_helper.map
