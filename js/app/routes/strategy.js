// Generated by CoffeeScript 1.7.1
(function() {
  App.StrategyRoute = Ember.Route.extend({
    model: function(params) {
      var administration;
      console.log("-------------->", params);
      return administration = this.store.find('administration', params.get('administration_id'));
    }
  });

}).call(this);

//# sourceMappingURL=strategy.map
