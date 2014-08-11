App.GraphController = Ember.ArrayController.extend
    nodes: []
    edges: []

    dataSet: ( ->
        data =
            nodes: @get('nodes')
            edges: @get('edges')
        data
    ).property('nodes.@each', 'edges.@each')

    init: ->
        @set('nodes', [])
        @set('edges', [])

    selectedStrategiesCount: (->
        @get('model').get('length')
    ).property('strategies.@each.strategy')