// Generated by CoffeeScript 1.7.1
(function() {
  App.XGraphComponent = Ember.View.extend({
    editing: false,
    toggleEditing: (function() {
      if (this.graph !== null) {
        this.graph.setOptions({
          dataManipulation: this.get("editing")
        });
      }
    }).observes("editing"),
    data: null,
    graphDataSet: {
      nodes: new vis.DataSet(),
      edges: new vis.DataSet()
    },
    selected: "",
    graph: null,
    setup: function() {
      var container, data, options, _this;
      _this = this;
      container = $("<div>").appendTo(this.$())[0];
      data = this.get("graphDataSet");
      options = {
        width: "100%",
        height: "600px",
        stabilize: false,
        stabilizationIterations: 1,
        dataManipulation: this.get("editing")
      };
      this.graph = new vis.Network(container, data, options);
      this.graph.on("click", function(data) {
        console.log("Graph click");
        if (data.nodes.length > 0) {
          _this.set("selected", data.nodes[0]);
        }
      });
      $(window).resize(function() {
        _this.graph.redraw();
      });
    },
    dataUpdates: (function() {
      var d, delEdges, delNodes, md, newEdges;
      if (this.graph === null) {
        this.setup();
      }
      md = this.get("data");
      d = this.get("graphDataSet");
      if ((d != null) && (md != null)) {
        delNodes = d.nodes.get({
          filter: function(i) {
            var yes_;
            yes_ = true;
            md.nodes.forEach(function(j) {
              if (i.id === j.id) {
                yes_ = false;
              }
            });
            return yes_;
          }
        });
        d.nodes.remove(delNodes);
        d.nodes.update(md.nodes);
        delEdges = d.edges.get({
          filter: function(i) {
            var yes_;
            yes_ = true;
            md.edges.forEach(function(j) {
              if (i.id === j.id) {
                yes_ = false;
              }
            });
            return yes_;
          }
        });
        d.edges.remove(delEdges);
        newEdges = md.edges.filter(function(edge) {
          return d.nodes.get(edge.from) !== null && d.nodes.get(edge.to) !== null;
        });
        d.edges.update(newEdges);
      }
    }).observes("data").on("didInsertElement")
  });

}).call(this);

//# sourceMappingURL=graph.map
