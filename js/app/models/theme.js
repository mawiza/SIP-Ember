// Generated by CoffeeScript 1.7.1
(function() {
  App.Theme = DS.Model.extend({
    definition: DS.attr('string'),
    focusareas: DS.hasMany('focusarea', {
      async: true
    })
  });

}).call(this);

//# sourceMappingURL=theme.map