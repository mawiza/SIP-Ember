// Generated by CoffeeScript 1.7.1
(function() {
  App.AdministrationsEditController = Ember.ObjectController.extend({
    actions: {
      update: function() {
        var administration;
        administration = this.get('model');
        return this.utility.updateOrSave(this, administration);
      },
      "delete": function() {
        var administration, self;
        self = this;
        administration = this.get('model');
        this.store.find('strategy', {
          administration: administration
        }).then(function(strategies) {
          return console.log(strategies);
        });
        return console.log('delete administration');
      },
      cancel: function() {
        return this.transitionToRoute('/administrations');
      }
    }
  });

}).call(this);

//# sourceMappingURL=administrationsEdit.map
