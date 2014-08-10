App.GraphController = Ember.ArrayController.extend
    nodes: []
    edges: []

    data: ( ->
        console.log "fired!"
        dataset =
            nodes: JSON.parse(JSON.stringify(@get('nodes')))
            edges: @get('edges')
        dataset
    ).property('nodes', 'edges')

    actions:
        loadStrategies: ->
            console.log "NODE:", @get('nodes')
            console.log "Loading strategies", @get('data')
            @nodes = []
            @edges = []
            strategies = @get('model').filterProperty('selected', true)
            self = this
            strategies.forEach (strategy) ->
                self.buildNode(strategy)

    selectedStrategiesCount: (->
        @get('model').filterProperty('selected', true).get('length')
    ).property('strategies.@each.strategy')

    buildNode: (strategy) ->
        console.log "Building the node for ", strategy.get('id')
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
                self.get('nodes').pushObject node
                #console.log "NODE:", self.get('data')
                console.log "NODE:", self.get('nodes')
