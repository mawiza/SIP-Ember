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
            html += "<div class='well well-sm' style='margin-bottom: 0px; background-color:" + nodes[0]['color'] + ";'>" + group + "</div>"
            html += "<div><br>"
            nodes.forEach (value) ->
                html += "<div>" + value['description'] + "</div><hr>"
            html += "</div><br>"
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

        #console.log focusareas
        @set('focusareas', focusareas)
        @get('orderedFocusareasToHtml')

    orderedFocusareasToHtml: (->
        html = "<div>"
        groupedFocusareasNodes = @get('focusareas')
        Object.keys(groupedFocusareasNodes).forEach (focusarea) ->
            nodes = groupedFocusareasNodes[focusarea]
            html += "<div class='well well-sm' style='margin-bottom: 5px;'>" + focusarea + "</div>"
            html += "<div>"
            nodes.forEach (value) ->
                html += "<div><span class='badge' style='background-color: " + value['color'] + "'>" + value['group'] + "</span> " + value['description'] + "</div>"
            html += "</div><br>"
        html += "</div>"

        $('#ordered_by_focusareas').html(html)
    ).property('focusareas.@each')