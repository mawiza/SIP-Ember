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
    ).observes('dataSet').on('didInsertElement')

    dataSetToHtml: (->
        html = "<div>"
        if @grouped?
            console.log "DATA!!!!", @grouped
            for key, values in @grouped
                console.log "!!!!", key
                #html += "<div>" + key + "</div>"
                #values.forEach (value) ->
                #    html += "<div>" + value['id'] + "</div>"

        html += "</div>"

        @set('orderedByGroup', html)
    ).observes('grouped')