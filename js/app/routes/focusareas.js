// Generated by CoffeeScript 1.7.1
(function() {
  App.FocusareasRoute = Ember.Route.extend({
    model: function(params) {
      App.log('Loading the model for focusarea', 'App.FocusareasRoute.model', params);
      return this.store.find('focusarea', {
        theme: params.theme_id
      });
    }
  });

  App.FocusareasNewRoute = Ember.Route.extend({
    model: function() {
      return this.store.createRecord('focusarea');
    },
    afterModel: function() {
      return this.set('theme', this.modelFor('theme'));
    },
    setupController: function(controller, model) {
      var theme_id;
      this._super(controller, model);
      theme_id = this.controllerFor('focusareas').get('model').get('query.theme');
      return controller.set('theme_id', theme_id);
    }
  });

  App.FocusareasEditRoute = Ember.Route.extend({
    model: function() {
      App.log('Loading the model for focusarea', 'App.FocusareasEditRoute.model');
      return this.modelFor('focusarea');
    },
    setupController: function(controller, model) {
      var theme_id;
      this._super(controller, model);
      theme_id = this.controllerFor('focusareas').get('model').get('query.theme');
      return controller.set('theme_id', theme_id);
    }
  });

}).call(this);

//# sourceMappingURL=focusareas.map
