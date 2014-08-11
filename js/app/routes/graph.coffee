App.GraphRoute = Ember.Route.extend
    model: ->
        model = @store.findAll('strategy')

    setupController: (controller, model) ->
        strategies = model.filterProperty('selected', true)
        controller.set(model, strategies)
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
                        node['title'] = "<b><u>" + theme.get('definition') + "</u></b><br><em>" + focusarea.get('definition') + "</em><br>" + strategy.get('description')
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
                        #console.log "StrategiesA:", strategiesA
                        if strategiesA.length == 2
                            edge = {}
                            edge['to'] = strategiesA[0].get('id')
                            edge['from'] = strategiesA[1].get('id')
                            #console.log "Edge:", edge
                            controller.get('edges').pushObject edge
                        else
                            for i in [1..strategiesA.length-1] by 1
                                edge = {}
                                edge['to'] = strategiesA[0].get('id')
                                edge['from'] = strategiesA[i].get('id')
                                console.log "Edge:", edge
                                controller.get('edges').pushObject edge


