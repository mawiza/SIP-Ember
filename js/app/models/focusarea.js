// Generated by CoffeeScript 1.7.1
(function() {
  App.Focusarea = DS.Model.extend({
    definition: DS.attr('string'),
    theme: DS.belongsTo('theme', {
      async: true
    }),
    strategies: DS.hasMany('strategy', {
      async: true
    })
  });

}).call(this);

//# sourceMappingURL=focusarea.map
