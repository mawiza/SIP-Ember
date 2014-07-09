// Generated by CoffeeScript 1.7.1
(function() {
  App.ThemesIndexRoute = Ember.Route.extend({
    model: function(params) {
      App.log('Loading the model for theme', 'App.ThemesIndexRoute.model', params);
      return this.store.find('theme');
    },
    afterModel: function(themes, transition) {
      return this.transitionTo("/themes/" + themes.get("firstObject").get('id') + "/focusareas");
    }
  });

  App.ThemesRoute = Ember.Route.extend({
    model: function(params) {
      App.log('Loading the model for theme', 'App.ThemesRoute.model', params);
      return this.store.find('theme');
    },
    afterModel: function(themes, transition) {
      if (themes.get("firstObject") != null) {
        return this.transitionTo("/themes/" + themes.get("firstObject").get('id') + "/focusareas");
      } else {
        return this.transitionTo("/themes/new");
      }
    }
  });

  App.ThemesNewRoute = Ember.Route.extend({
    model: function() {
      App.log('Loading the model for theme', 'App.ThemesNewRoute.model');
      return this.store.createRecord('theme');
    }
  });

  App.ThemesEditRoute = Ember.Route.extend({
    model: function(params) {
      App.log('Loading the model for theme', 'App.ThemesEditRoute.model', params);
      return this.modelFor('theme', params);
    },
    setupController: function(controller, model) {
      var focusareas;
      this._super(controller, model);
      focusareas = this.store.find('focusarea', {
        theme: model.id
      });
      return focusareas.then(function() {
        App.log('Setting up the controller for edit theme', 'App.ThemesEditRoute.setupController', focusareas);
        return controller.set('focusareasLength', focusareas.get('length'));
      });
    }
  });

}).call(this);

//# sourceMappingURL=themes.map
