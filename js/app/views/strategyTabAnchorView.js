// Generated by CoffeeScript 1.7.1
(function() {
  App.StrategyTabAnchorView = Ember.View.extend({
    tagName: "a",
    didInsertElement: function() {
      return this.$().attr("href", "#/strategies/administration/" + this.get('administration_id'));
    },
    click: function() {
      console.log("clicked", this.get("administration_id"));
      $('.strategies-administrations-tab').removeClass('active');
      return $('#' + this.get("administration_id")).addClass('active');
    }
  });

}).call(this);

//# sourceMappingURL=strategyTabAnchorView.map