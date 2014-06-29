// Generated by CoffeeScript 1.7.1
(function() {
  App.FocusareasRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.find('focusarea', {
        theme: params.theme_id
      });
    }
  });

  App.FocusareasNewRoute = Ember.Route.extend({
    model: function() {
      return this.store.createRecord('focusarea');
    },
    afterModel: function(theme, transition) {
      return console.log("theme.id: " + theme.id);
    }
  });

  App.FocusareasEditRoute = Ember.Route.extend({
    model: function() {
      return this.modelFor('focusarea');
    },
    setupController: function(controller, model) {
      this._super(controller, model);
      controller.set('availableThemes', this.store.find('theme'));
      return model.get('theme').then(function(theme) {
        return controller.set('selectedTheme', theme.get('id'));
      });
    }
  });

}).call(this);

//# sourceMappingURL=focusareas.map
