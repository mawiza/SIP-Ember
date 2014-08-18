App.XGraphSummaryComponent = Ember.Component.extend
    dataSet: null
    nodes: []
    edges: []
    grouped: {}
    orderedByGroup: null

    processDataSet: (->
        dataSet = @get('dataSet')
        @set('nodes', dataSet['nodes'])
        @set('edges', dataSet['edges'])
        grouped = {}
        #sort it into a group
        dataSet['nodes'].forEach (node) ->
            if grouped[node.group]?
                grouped[node.group].push node
            else
                grouped[node.group] = [node]

        @set('grouped', grouped)
        @get('dataSetToHtml')
    ).observes('dataSet').on('didInsertElement')

    dataSetToHtml: (->
        html = "<div>"
        groupedNodes = @get('grouped')
        Object.keys(groupedNodes).forEach (group) ->
            nodes = groupedNodes[group]
            html += "<div class='well well-sm' style='margin-bottom: 0px; background-color:" + nodes[0]['color'] + ";'>" + group + "</div>"
            html += "<div>"
            nodes.forEach (value) ->
                html += "<div>" + value['description'] + "</div>"
            html += "</div><br>"
        html += "</div>"

        console.log html
        $('#ordered_by_group').html(html)
        #@set('orderedByGroup', html)
    ).property('grouped.@each')