App.GraphRoute = Ember.Route.extend
    model: ->
        model = @store.findAll('strategy')

    setupController: (controller, model) ->
        strategies = model.filterProperty('selected', true)
        controller.set(model, strategies)
        controller.set('selectedStrategiesCount', strategies.get('length'))
        controller.get('nodes').clear()
        @loadNodes(controller, strategies)
        controller.get('edges').clear()
        @loadEdges(controller, strategies)

    loadNodes: (controller, strategies) ->
        self = this
        strategies.forEach (strategy) ->
            node = {}
            node['id'] = strategy.get('id')
            node['description'] = strategy.get('description')
            node['selected'] = strategy.get('selected')
            self.store.find('administration', strategy.get('administration.id')).then (administration) ->
                node['group'] = administration.get('name')
                node['label'] = administration.get('name')
                node['color'] = administration.get('color')
                node['color.highlight'] = administration.get('shadedTabStyle')
                node['administration_id'] = administration.get('id')
                self.store.find('focusarea', strategy.get('focusarea.id')).then (focusarea) ->
                    node['focusarea'] = focusarea.get('definition')
                    node['focusarea_id'] = focusarea.get('id')
                    self.store.find('theme', focusarea.get('theme.id')).then (theme) ->
                        node['title'] = "<b><u>" + theme.get('definition') + "</u></b><br><em>" + focusarea.get('definition') + "</em>"
                        #node['title'] = "<b><u>" + theme.get('definition') + "</u></b><br><em>" + focusarea.get('definition') + "</em><br>" + strategy.get('description')
                        node['theme'] = theme.get('definition')
                        node['theme_id'] = theme.get('id')
                        controller.get('nodes').pushObject node

    loadEdges: (controller) ->
        @store.find('focusarea').then (focusareas) ->
            focusareas.forEach (focusarea) ->
                focusarea.get('strategies').then (strategies) ->
                    console.log 'Strategies:', strategies, "=", strategies.get('length')
                    if strategies? and strategies.get('length') > 1
                        strategiesA = strategies.toArray()

                        selectedStrategies = []
                        for i in [0..strategiesA.length-1] by 1
                            if strategiesA[i].get('selected')
                                selectedStrategies.push(strategiesA[i])

                        for i in [0..selectedStrategies.length-1] by 1
                            if i > 0 and i <= selectedStrategies.length
#                                if selectedStrategies[i-1].get('selected') and selectedStrategies[i].get('selected')
#                                    console.log selectedStrategies[i-1].get('description'), "->", selectedStrategies[i].get('description')
#                                else if selectedStrategies[i-1].get('selected') and not selectedStrategies[i].get('selected')
#                                    console.log selectedStrategies[i-1].get('description'), "->", ""
#                                else if not selectedStrategies[i-1].get('selected') and selectedStrategies[i].get('selected')
#                                    console.log "", "->", selectedStrategies[i].get('description')
                                edge = {}
                                edge['to'] = selectedStrategies[i-1].get('id')
                                edge['from'] = selectedStrategies[i].get('id')
                                #console.log "Edge(", i, "):", edge
                                controller.get('edges').pushObject edge
