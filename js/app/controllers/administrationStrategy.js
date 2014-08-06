// Generated by CoffeeScript 1.7.1
(function() {
  App.AdministrationStrategyController = Ember.ObjectController.extend(App.AutosavableController, {
    needs: 'strategiesAdministration',
    strategiesAdministration: Ember.computed.alias("controllers.strategiesAdministration"),
    bufferedFields: ['description'],
    instaSaveFields: ['selected'],
    ready: false,
    init: function() {
      var administration, focusarea, self;
      console.log("init called");
      focusarea = this.get('model');
      administration = this.get('strategiesAdministration.administration');
      self = this;
      return this.store.find("strategy", {
        focusarea: focusarea.get('id'),
        administration: administration.get('id')
      }).then(function(result) {
        var strategy;
        console.log("FOUND:", result.get('length'));
        if (result.get('length') === 0) {
          console.log("CREATING...");
          strategy = self.store.createRecord('strategy', {
            isSelected: false,
            administration: administration,
            focusarea: focusarea
          });
          console.log("SAVING...");
          strategy.save().then(function() {
            console.log("SAVING AND PUSHING...");
            administration.get('strategies').pushObject(strategy);
            administration.save();
            focusarea.get('strategies').pushObject(strategy);
            focusarea.save();
            console.log("STRATEGY:", strategy);
            return self.set('model', strategy);
          });
        } else {
          self.set('model', result.get('firstObject'));
        }
        self.set('ready', true);
        return self._super();
      });
    }
  });

}).call(this);

//# sourceMappingURL=administrationStrategy.map
