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
        html += "<div style='margin-bottom: 5px;' class='panel panel-info'><div style='color:" + nodes[0]['color'] + ";' class='panel-heading'><h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordion' href='#administration" + nodes[0].administration_id + "'><b>" + group + "</b></a></h4></div>";
        html += "<div id='administration" + nodes[0].administration_id + "' class='panel-collapse collapse out'><div class='panel-body'>";
        nodes.forEach(function(value) {
          return html += "<div>" + value['description'] + "</div><hr>";
        });
        return html += "</div></div></div>";
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
        html += "<div style='margin-bottom: 5px;' class='panel panel-info'><div class='panel-heading'><h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordion' href='#focusarea" + nodes[0].focusarea_id + "'>" + focusarea + "</a></h4></div>";
        html += "<div id='focusarea" + nodes[0].focusarea_id + "' class='panel-collapse collapse out'><div class='panel-body'>";
        nodes.forEach(function(value) {
          return html += "<div><span class='badge' style='background-color: " + value['color'] + "'>" + value['group'] + "</span> " + value['description'] + "</div>";
        });
        return html += "</div></div></div>";
      });
      html += "</div>";
      return $('#ordered_by_focusareas').html(html);
    }).property('focusareas.@each')
  });

}).call(this);

//# sourceMappingURL=graphSummary.map
