// Generated by CoffeeScript 1.7.1
(function() {
  App.AdministrationsRoute = Ember.Route.extend({
    model: function() {
      this.store.all('administration').forEach(function(model) {
        if (model && model.get("isDirty")) {
          return model.rollback();
        }
      });
      return this.store.find('administration');
    }
  });

  App.AdministrationsNewRoute = Ember.Route.extend({
    model: function() {
      return this.store.createRecord('administration');
    }
  });

  App.AdministrationsEditRoute = Ember.Route.extend({
    model: function() {
      return this.modelFor('administration');
    }
  });

}).call(this);

//# sourceMappingURL=administrations.map
