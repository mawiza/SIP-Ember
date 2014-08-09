App.GraphController = Ember.ArrayController.extend
    nodes: []
    edges: []

    data: ( ->
        nodes: @get('nodes')
        edges: @get('edges')
    ).property('nodes', 'edges')

#    selectedStrategies: ->
#        strategies = @get('model').filterProperty('selected', true)
#        strategies.forEach (strategy) ->
#            @_buildNode(strategy)

#    selectedStrategies: (->
#        serealizedStrategies = []
#        strategies = @get('model').filterProperty('selected', true)
#        self = @
#        strategies.forEach (strategy) ->
#            self._buildNode(strategy)
#        #            hash = strategy.getProperties('id', 'description', 'selected', 'administration.id', 'focusarea.id')
#        #            serealizedStrategies.push hash
#        #        edges = []
#        #        graphDataSet =
#        #            nodes: JSON.parse(JSON.stringify(serealizedStrategies))
#        #            edges: edges
#        #        console.log "GRAPH", graphDataSet
#        #        graphDataSet
#        "loading..."
#    ).property('strategies.@each')

    actions:
        loadStrategies: ->
            @nodes = []
            @edges = []
            strategies = @get('model').filterProperty('selected', true)
            self = @
            strategies.forEach (strategy) ->
                self._buildNode(strategy)

    selectedStrategiesCount: (->
        @get('model').filterProperty('selected', true).get('length')
    ).property('strategies.@each.strategy')

    _buildNode: (strategy) ->
        self = this
        node = {}
        node['id'] = strategy.get('id')
        node['description'] = strategy.get('description')
        node['selected'] = strategy.get('selected')
        @store.find('administration', strategy.get('administration.id')).then (administration) ->
            node['group'] = administration.get('name')
            node['color'] = administration.get('color')
            node['administration_id'] = administration.get('id')
            self.store.find('focusarea', strategy.get('focusarea.id')).then (focusarea) ->
                node['focusarea'] = focusarea.get('definition')
                node['focusarea_id'] = focusarea.get('id')
                #node['theme'] = strategy.get('focusarea.theme.definition')
                #node['theme_id'] = strategy.get('focusarea.theme.id')
                self.nodes.push node
                console.log "NODE:", node


