// Generated by CoffeeScript 1.7.1
(function() {
  App.FocusareasRoute = Ember.Route.extend({
    model: function() {
      this.store.all('focusarea').forEach(function(model) {
        if (model && model.get("isDirty")) {
          return model.rollback();
        }
      });
      return this.store.find('focusarea');
    }
  });

  App.FocusareasNewRoute = Ember.Route.extend({
    model: function() {
      return this.store.createRecord('focusarea');
    },
    setupController: function(controller, model) {
      this._super(controller, model);
      controller.set('availableThemes', this.store.find('theme'));
      return controller.set('selectedTheme', this.store.find('theme')[0]);
    }
  });

  App.FocusareasEditRoute = Ember.Route.extend({
    model: function() {
      return this.modelFor('focusarea');
    }
  });

}).call(this);

//# sourceMappingURL=focusareas.map
