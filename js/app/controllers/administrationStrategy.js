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
        var error, strategy;
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
                administration.get('strategies').then(function(strategies) {
                  strategies.pushObject(strategy);
                  return administration.save().then(function() {});
                });
                focusarea.get('strategies').then(function(strategies) {
                  strategies.pushObject(strategy);
                  return focusarea.save().then(function() {});
                });
                self.set('model', strategy);
                self.set('ready', true);
                return self._super();
              });
            });
          } else {
            strategy = result.get('firstObject');
            self.store.find("administration", strategy.get('administration.id')).then(function(administration) {
              return administration.get('strategies').then(function(strategies) {
                var found;
                found = false;
                strategies.forEach(function(savedStrategy) {
                  if (savedStrategy.get('id') === strategy.get('id')) {
                    return found = true;
                  }
                });
                if (!found) {
                  strategies.pushObject(strategy);
                  return administration.save().then(function() {});
                }
              });
            });
            self.store.find("focusarea", strategy.get('focusarea.id')).then(function(focusarea) {
              return focusarea.get('strategies').then(function(strategies) {
                var found;
                found = false;
                strategies.forEach(function(savedStrategy) {
                  if (savedStrategy.get('id') === strategy.get('id')) {
                    return found = true;
                  }
                });
                if (!found) {
                  strategies.pushObject(strategy);
                  return focusarea.save().then(function() {});
                }
              });
            });
            self.set('model', strategy);
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
