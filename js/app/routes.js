// Generated by CoffeeScript 1.7.1
(function() {
  App.Router.map(function() {
    this.resource("administrations");
    this.resource("administrations.new", {
      path: '/administrations/new'
    });
    this.resource("administrations.edit", {
      path: '/administrations/edit/:id'
    });
    this.resource('about');
    this.resource('themes');
    this.resource('themes.new', {
      path: '/themes/new'
    });
    return this.resource('focusareas');
  });

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

//# sourceMappingURL=routes.map
