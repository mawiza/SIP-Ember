App.AdministrationStrategyController = Ember.ObjectController.extend App.AutosavableController,
    needs: 'strategiesAdministration'
    strategiesAdministration: Ember.computed.alias("controllers.strategiesAdministration")
    bufferedFields: ['description']
    instaSaveFields: ['selected']
    ready: false

    init: -> #reseting the passed in model to the found or created strategy model
        console.log "init called"
        focusarea = @get('model')
        administration = @get('strategiesAdministration.administration')

        self = this
        @store.find("strategy",
            focusarea: focusarea.get('id')
            administration: administration.get('id')
        ).then (result) ->
            console.log "FOUND:", result.get('length')
            self.set "_buffers", Ember.Map.create()
            if result.get('length') == 0
                console.log "CREATING..."
                administration.then (administration) ->
                    strategy = self.store.createRecord('strategy',
                        isSelected: false
                        administration: administration
                        focusarea: focusarea
                    )
                    console.log "SAVING..."
                    strategy.save().then ->
                        console.log "SAVING AND PUSHING..."
                        administration.get('strategies').pushObject(strategy)
                        administration.save()
                        focusarea.get('strategies').pushObject(strategy)
                        focusarea.save()
                        console.log "STRATEGY:", strategy
                        self.set('model', strategy)
                        self.set('ready', true)
                        self._super()
            else
                self.set('model', result.get('firstObject'))
                self.set('ready', true)
                self._super()
