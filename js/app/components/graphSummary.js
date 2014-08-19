// Generated by CoffeeScript 1.7.1
(function() {
  var focusareas;

  App.XGraphSummaryComponent = Ember.Component.extend({
    dataSet: null,
    nodes: [],
    edges: [],
    grouped: {}
  }, focusareas = {}, {
    processDataSet: (function() {
      var dataSet;
      dataSet = this.get('dataSet');
      this.set('nodes', dataSet['nodes']);
      this.set('edges', dataSet['edges']);
      this.orderByGroup(dataSet);
      return this.orderByFocusareas(dataSet);
    }).observes('dataSet').on('didInsertElement'),
    orderByGroup: function(dataSet) {
      var grouped;
      grouped = {};
      dataSet['nodes'].forEach(function(node) {
        if (grouped[node.group] != null) {
          return grouped[node.group].push(node);
        } else {
          return grouped[node.group] = [node];
        }
      });
      this.set('grouped', grouped);
      return this.get('orderedGroupToHtml');
    },
    orderedGroupToHtml: (function() {
      var groupedNodes, html;
      html = "<div>";
      groupedNodes = this.get('grouped');
      Object.keys(groupedNodes).forEach(function(group) {
        var nodes;
        nodes = groupedNodes[group];
        html += "<div class='well well-sm' style='margin-bottom: 0px; background-color:" + nodes[0]['color'] + ";'>" + group + "</div>";
        html += "<div><br>";
        nodes.forEach(function(value) {
          return html += "<div>" + value['description'] + "</div><hr>";
        });
        return html += "</div><br>";
      });
      html += "</div>";
      return $('#ordered_by_group').html(html);
    }).property('grouped.@each'),
    orderByFocusareas: function(dataSet) {
      focusareas = {};
      dataSet['nodes'].forEach(function(node) {
        if (focusareas[node.focusarea] != null) {
          return focusareas[node.focusarea].push(node);
        } else {
          return focusareas[node.focusarea] = [node];
        }
      });
      this.set('focusareas', focusareas);
      return this.get('orderedFocusareasToHtml');
    },
    orderedFocusareasToHtml: (function() {
      var groupedFocusareasNodes, html;
      html = "<div>";
      groupedFocusareasNodes = this.get('focusareas');
      Object.keys(groupedFocusareasNodes).forEach(function(focusarea) {
        var nodes;
        nodes = groupedFocusareasNodes[focusarea];
        html += "<div class='well well-sm' style='margin-bottom: 5px;'>" + focusarea + "</div>";
        html += "<div>";
        nodes.forEach(function(value) {
          return html += "<div><span class='badge' style='background-color: " + value['color'] + "'>" + value['group'] + "</span> " + value['description'] + "</div>";
        });
        return html += "</div><br>";
      });
      html += "</div>";
      return $('#ordered_by_focusareas').html(html);
    }).property('focusareas.@each')
  });

}).call(this);

//# sourceMappingURL=graphSummary.map
