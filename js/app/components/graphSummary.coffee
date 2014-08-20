App.XGraphSummaryComponent = Ember.Component.extend
    dataSet: null
    nodes: []
    edges: []
    grouped: {}
    focusareas = {}

    processDataSet: (->
        dataSet = @get('dataSet')
        @set('nodes', dataSet['nodes'])
        @set('edges', dataSet['edges'])
        @orderByGroup(dataSet)
        @orderByFocusareas(dataSet)
    ).observes('dataSet').on('didInsertElement')

    orderByGroup: (dataSet) ->
        grouped = {}
        dataSet['nodes'].forEach (node) ->
            if grouped[node.group]?
                grouped[node.group].push node
            else
                grouped[node.group] = [node]
        @set('grouped', grouped)
        @get('orderedGroupToHtml')

    orderedGroupToHtml: (->
        html = "<div>"
        groupedNodes = @get('grouped')
        Object.keys(groupedNodes).forEach (group) ->
            nodes = groupedNodes[group]
            html += "<div style='margin-bottom: 5px;' class='panel panel-info'><div style='color:" + nodes[0]['color'] + ";' class='panel-heading'><h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordion' href='#administration" + nodes[0].administration_id + "'>" +  group + "</a></h4></div>"
            html += "<div id='administration" + nodes[0].administration_id + "' class='panel-collapse collapse out'><div class='panel-body'>"
            nodes.forEach (value) ->
                html += "<div>" + value['description'] + "</div><hr>"
            html += "</div></div></div>"
        html += "</div>"

        $('#ordered_by_group').html(html)
    ).property('grouped.@each')


    #order by focusarea
    orderByFocusareas: (dataSet) ->
        focusareas = {}
        dataSet['nodes'].forEach (node) ->
            if focusareas[node.focusarea]?
                focusareas[node.focusarea].push node
            else
                focusareas[node.focusarea] = [node]
        @set('focusareas', focusareas)
        @get('orderedFocusareasToHtml')

    orderedFocusareasToHtml: (->
        html = "<div>"
        groupedFocusareasNodes = @get('focusareas')
        Object.keys(groupedFocusareasNodes).forEach (focusarea) ->
            nodes = groupedFocusareasNodes[focusarea]
            html += "<div style='margin-bottom: 5px;' class='panel panel-info'><div class='panel-heading'><h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordion' href='#focusarea" + nodes[0].focusarea_id + "'>" +  focusarea + "</a></h4></div>"
            html += "<div id='focusarea" + nodes[0].focusarea_id + "' class='panel-collapse collapse out'><div class='panel-body'>"
            nodes.forEach (value) ->
                html += "<div><span class='badge' style='background-color: " + value['color'] + "'>" + value['group'] + "</span> " + value['description'] + "</div>"
            html += "</div></div></div>"
        html += "</div>"

        $('#ordered_by_focusareas').html(html)
    ).property('focusareas.@each')