// Generated by CoffeeScript 1.7.1
(function() {
  App.ThemeSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin).extend({
    attrs: {
      focusareas: {
        serialize: "ids",
        deserialize: "ids"
      }
    }
  });

  App.Theme = DS.Model.extend({
    definition: DS.attr('string'),
    focusareas: DS.hasMany('focusarea', {
      async: true
    }),
    hashedID: (function() {
      return "#" + this.get('id');
    }).property("id")
  });

}).call(this);

//# sourceMappingURL=theme.map
