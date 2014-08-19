// Generated by CoffeeScript 1.7.1
(function() {
  App.GraphRoute = Ember.Route.extend({
    model: function() {
      var model;
      return model = this.store.findAll('strategy');
    },
    setupController: function(controller, model) {
      var strategies;
      strategies = model.filterProperty('selected', true);
      controller.set(model, strategies);
      controller.set('selectedStrategiesCount', strategies.get('length'));
      controller.get('nodes').clear();
      this.loadNodes(controller, strategies);
      controller.get('edges').clear();
      return this.loadEdges(controller, strategies);
    },
    loadNodes: function(controller, strategies) {
      var self;
      self = this;
      return strategies.forEach(function(strategy) {
        var node;
        node = {};
        node['id'] = strategy.get('id');
        node['description'] = strategy.get('description');
        node['selected'] = strategy.get('selected');
        return self.store.find('administration', strategy.get('administration.id')).then(function(administration) {
          node['group'] = administration.get('name');
          node['label'] = administration.get('name');
          node['color'] = administration.get('color');
          node['color.highlight'] = administration.get('shadedTabStyle');
          node['administration_id'] = administration.get('id');
          return self.store.find('focusarea', strategy.get('focusarea.id')).then(function(focusarea) {
            node['focusarea'] = focusarea.get('definition');
            node['focusarea_id'] = focusarea.get('id');
            return self.store.find('theme', focusarea.get('theme.id')).then(function(theme) {
              node['title'] = "<b><u>" + theme.get('definition') + "</u></b><br><em>" + focusarea.get('definition') + "</em><br>" + strategy.get('description');
              node['theme'] = theme.get('definition');
              node['theme_id'] = theme.get('id');
              return controller.get('nodes').pushObject(node);
            });
          });
        });
      });
    },
    loadEdges: function(controller) {
      return this.store.find('focusarea').then(function(focusareas) {
        return focusareas.forEach(function(focusarea) {
          return focusarea.get('strategies').then(function(strategies) {
            var edge, i, selectedStrategies, strategiesA, _i, _j, _ref, _ref1, _results;
            console.log('Strategies:', strategies, "=", strategies.get('length'));
            if ((strategies != null) && strategies.get('length') > 1) {
              strategiesA = strategies.toArray();
              selectedStrategies = [];
              for (i = _i = 0, _ref = strategiesA.length - 1; _i <= _ref; i = _i += 1) {
                if (strategiesA[i].get('selected')) {
                  selectedStrategies.push(strategiesA[i]);
                }
              }
              _results = [];
              for (i = _j = 0, _ref1 = selectedStrategies.length - 1; _j <= _ref1; i = _j += 1) {
                if (i > 0 && i <= selectedStrategies.length) {
                  edge = {};
                  edge['to'] = selectedStrategies[i - 1].get('id');
                  edge['from'] = selectedStrategies[i].get('id');
                  _results.push(controller.get('edges').pushObject(edge));
                } else {
                  _results.push(void 0);
                }
              }
              return _results;
            }
          });
        });
      });
    }
  });

}).call(this);

//# sourceMappingURL=graph.map
