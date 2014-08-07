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
      focusarea = this.get('model');
      administration = this.get('strategiesAdministration.administration');
      self = this;
      return this.store.find("strategy", {
        focusarea: focusarea.get('id'),
        administration: administration.get('id')
      }).then(function(result) {
        var error;
        try {
          self.set("_buffers", Ember.Map.create());
          if (result.get('length') === 0) {
            return administration.then(function(administration) {
              var strategy;
              strategy = self.store.createRecord('strategy', {
                isSelected: false,
                administration: administration,
                focusarea: focusarea
              });
              return strategy.save().then(function() {
                administration.get('strategies').pushObject(strategy);
                administration.save();
                focusarea.get('strategies').pushObject(strategy);
                focusarea.save();
                self.set('model', strategy);
                self.set('ready', true);
                return self._super();
              });
            });
          } else {
            self.set('model', result.get('firstObject'));
            self.set('ready', true);
            return self._super();
          }
        } catch (_error) {
          error = _error;
          return self._super();
        }
      });
    }
  });

}).call(this);

//# sourceMappingURL=administrationStrategy.map
