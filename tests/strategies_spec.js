// Generated by CoffeeScript 1.7.1
(function() {
  describe('Strategies should', function() {
    describe('have a model that', function() {
      it('should have a description property', function() {
        var descriptionProperty;
        descriptionProperty = App.Strategy.metaForProperty('description');
        return expect(descriptionProperty.type).to.equal('string');
      });
      it('should have a administration property', function() {
        var administrationProperty;
        administrationProperty = App.Strategy.metaForProperty('administration');
        return expect(administrationProperty.type).to.equal('administration');
      });
      it('should have a focusarea property', function() {
        var focusareaProperty;
        focusareaProperty = App.Strategy.metaForProperty('focusarea');
        return expect(focusareaProperty.type).to.equal('focusarea');
      });
      return it('can be created', function() {
        return Ember.run(function() {
          var administration, store;
          store = App.__container__.lookup('store:main');
          administration = store.createRecord("administration", {
            name: 'administration created in strategies spec',
            color: '#000'
          });
          return administration.save().then(function() {
            var theme;
            theme = store.createRecord("theme", {
              definition: 'theme created in strategies spec'
            });
            return theme.save().then(function() {
              var focusarea;
              focusarea = store.createRecord("focusarea", {
                definition: 'focusarea created in strategies spec',
                theme: theme
              });
              return focusarea.save().then(function() {
                var strategy;
                theme.get("focusareas").then(function(focusareas) {
                  return focusareas.pushObject(focusarea);
                });
                strategy = store.createRecord('strategy', {
                  description: 'Strategy description',
                  administration: administration,
                  focusarea: focusarea
                });
                return strategy.save().then(function() {
                  administration.get('strategies').then(function(strategies) {
                    return strategies.pushObject(strategy);
                  });
                  return focusarea.get('strategies').then(function(strategies) {
                    return strategies.pushObject(strategy);
                  });
                });
              });
            });
          });
        });
      });
    });
    return describe('a strategy page that', function() {
      it('should have a list of administration tabs', function() {
        visit("/strategies");
        return andThen(function() {
          return expect(find('ul.administrations-tabs li').length).to.equal(1);
        });
      });
      return it('should have a list of administration tabs that each can be selected', function() {
        visit("/strategies");
        return andThen(function() {
          click('ul.administrations-tabs li a');
          return expect(find('ul.administrations-tabs li').length).to.equal(1);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=strategies_spec.map