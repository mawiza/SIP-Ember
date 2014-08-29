// Generated by CoffeeScript 1.7.1
(function() {
  App.AdministrationSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin).extend({
    attrs: {
      strategies: {
        serialize: "ids",
        deserialize: "ids"
      }
    }
  });

  App.Administration = DS.Model.extend({
    name: DS.attr('string'),
    color: DS.attr('string'),
    strategies: DS.hasMany('strategy', {
      async: true
    }),
    style: (function() {
      return "background-color:" + this.get('color') + ";width:200px;display: block; padding: 10px;margin-right: 150px;";
    }).property("color"),
    tabStyle: (function() {
      return "background-color:" + this.get('color') + ";width: 100%; height: 5px;";
    }).property("color"),
    shadedTabStyle: (function() {
      return "background-color:" + this.utility.colorLuminance(this.get('color'), 0.4) + ";width: 100%; height: 3px;";
    }).property("color"),
    shadedTabContentStyle: (function() {
      return "background-color:" + this.utility.colorLuminance(this.get('color'), 0.4) + ";width: 100%; height: 3px;";
    }).property("color"),
    hashedID: (function() {
      return "#" + this.get('id');
    }).property("id")
  });

}).call(this);

//# sourceMappingURL=administration.map
