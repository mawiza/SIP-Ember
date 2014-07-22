// Generated by CoffeeScript 1.7.1
(function() {
  App.FocusareasRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.findAll('focusarea');
    },
    afterModel: function(model) {
      var self, theme_id;
      theme_id = this.utility.themeId(window.location.href);
      self = this;
      return Ember.RSVP.hash({
        focusareas: this.store.findAll('focusarea')
      }).then(function(results) {
        console.log(results.focusareas);
        return self.controllerFor('focusareas').set('model', results.focusareas);
      });
    }
  });

  App.FocusareasNewRoute = Ember.Route.extend({
    model: function() {
      return this.store.createRecord('focusarea');
    }
  });

  App.FocusareasEditRoute = Ember.Route.extend({
    model: function() {
      return this.modelFor('focusarea');
    }
  });

}).call(this);

//# sourceMappingURL=focusareas.map
