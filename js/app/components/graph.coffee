#https://gist.github.com/xypaul/8320b4a92a97d628207b

App.XGraphComponent = Ember.View.extend(
    editing: false

    toggleEditing: (->
        @graph.setOptions dataManipulation: @get("editing")  if @graph isnt null
        return
    ).observes("editing")

    data: null

    graphDataSet:
        nodes: new vis.DataSet()
        edges: new vis.DataSet()

    selected: ""

    graph: null

    setup: ->
        _this = this
        container = $("<div>").appendTo(@$())[0]
        data = @get("graphDataSet")
        options =
            configurePhysics: false
#            physics:
#                barnesHut:
#                    gravitationalConstant: -1175
#                    centralGravity: 0.35
#                    springLength: 133
#                    springConstant: 0.031
#                    damping: 0.175
            navigation: true
            width: "100%"
            height: "600px"
            stabilize: false
            stabilizationIterations: 1
            dataManipulation: @get("editing")
            tooltip:
                delay: 300
                fontColor: "black"
                fontSize: 14 # px
                fontFace: "verdana"
                color:
                    border: "#666"
                    background: "#FFFFC6"

        # Initialise vis.js
        @graph = new vis.Network(container, data, options)

        #@graph.on "stabilized", (data) ->
        #    console.log data
        #    _this.graph.zoomExtent()

        # This sets the new selected item on click
        @graph.on "click", (data) ->
            console.log "clicked"
            if data.nodes.length > 0
                node_id = data.nodes[0]
                _this.set "selected", node_id
                _this.get("data").nodes.forEach (node) ->
                    if node.id == node_id
                        id = "#focusarea" + node.focusarea_id
                        $(id).collapse('toggle')
            return

        $(window).resize ->
            _this.graph.redraw() # This makes the graph responsive!!!
            return

        return

    dataUpdates: (->
        @setup()  if @graph is null
        md = @get("data")
        d = @get("graphDataSet")
        if d? and md?
            delNodes = d.nodes.get(filter: (i) ->
                yes_ = true
                md.nodes.forEach (j) ->
                    yes_ = false  if i.id is j.id
                    return
                yes_
            )
            d.nodes.remove delNodes
            d.nodes.update md.nodes
            delEdges = d.edges.get(filter: (i) ->
                yes_ = true
                md.edges.forEach (j) ->
                    yes_ = false  if i.id is j.id
                    return
                yes_
            )
            d.edges.remove delEdges
            newEdges = md.edges.filter((edge) ->
                d.nodes.get(edge.from) isnt null and d.nodes.get(edge.to) isnt null
            )
            d.edges.update newEdges
            return
    ).observes("data").on("didInsertElement")
)