// Generated by CoffeeScript 1.7.1
(function() {
  App.GraphController = Ember.ArrayController.extend({
    nodes: [],
    edges: [],
    dataSet: (function() {
      var data;
      data = {
        nodes: this.get('nodes'),
        edges: this.get('edges')
      };
      return data;
    }).property('nodes.@each', 'edges.@each'),
    init: function() {
      this.set('nodes', []);
      return this.set('edges', []);
    },
    selectedStrategiesCount: (function() {
      return this.get('model').get('length');
    }).property('strategies.@each.strategy')
  });

}).call(this);

//# sourceMappingURL=graph.map
