#https://gist.github.com/xypaul

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
            stabilize: false
            stabilizationIterations: 1
            dataManipulation: @get("editing")

        # Initialise vis.js
        @graph = new vis.Graph(container, data, options)

        # This sets the new selected item on click
        @graph.on "click", (data) ->
            _this.set "selected", data.nodes[0]  if data.nodes.length > 0
            return

        $(window).resize ->
            _this.graph.redraw() # This makes the graph responsive!!!
            return

        return

    # graph hasn't been initialised yet
    # has to be synched with data

    # Step 1: remove nodes which aren't in the d set anymore

    # Step 2: add all the new nodes & update nodes

    # Now same thing for edges

    # This is longer than Step 2 for nodes, as edges with no exisiting nodes need to be filtered out first
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