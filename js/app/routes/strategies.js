// Generated by CoffeeScript 1.7.1
(function() {
  App.StrategiesRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.findAll('administration');
    },
    afterModel: function(administrations, transition) {
      var administration_id;
      if (administrations.get("firstObject") != null) {
        administration_id = administrations.get("firstObject").get('id');
        return this.transitionTo("/strategies/administration/" + administration_id);
      }
    }
  });

}).call(this);

//# sourceMappingURL=strategies.map
