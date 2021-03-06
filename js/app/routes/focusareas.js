// Generated by CoffeeScript 1.7.1
(function() {
  App.FocusareasRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.filter('focusarea', {}, function(focusarea) {
        if (focusarea.get('data.theme.id') === params.theme_id) {
          return true;
        }
      });
    }
  });

  App.FocusareasNewRoute = Ember.Route.extend({
    model: function() {
      var focusarea;
      return focusarea = this.store.createRecord('focusarea');
    }
  });

  App.FocusareasEditRoute = Ember.Route.extend({
    model: function() {
      return this.modelFor('focusarea');
    }
  });

}).call(this);

//# sourceMappingURL=focusareas.map
