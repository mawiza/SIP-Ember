App.AdministrationStrategyController = Ember.ObjectController.extend App.AutosavableController,
    needs: 'strategiesAdministration'
    strategiesAdministration: Ember.computed.alias("controllers.strategiesAdministration")
    bufferedFields: ['description']
    instaSaveFields: ['selected']
    ready: false

    init: ->
        focusarea = @get('model')
        administration = @get('strategiesAdministration.administration')
        self = this
        @store.find("strategy",
            focusarea: focusarea.get('id')
            administration: administration.get('id')
        ).then (result) ->
            try
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
                        strategy.save()

                        #this creates inconsistency when we update the administration
                        #this does not affect the focusare, but it will eventually
                        #what happens is that when we call update, we cannot control the
                        #order the request are made in, in other words, we risk a admin
                        #call with to strategies gets called with one that has 3 strategies,
                        #where to of them are different from the existing strategies already
                        #saved, that then will replace the to not found with the two that
                        #already exits. So I need to create all the strategies, then
                        #update the administrations and the focusareas.
                        #this needs to be done in each the focusarea and the administration
                        #creation. In other words, we create a strategy when an administration
                        #gets created for every focusarea available, the same for when we create a
                        #a focusarea, we create a strategy for every existing administration.

#                        .then ->
#                            #console.log "SAVING AND PUSHING..."
#                            administration.get('strategies').pushObject(strategy)
#                            administration.save().then ->
#                                console.log "SAVED ADMINISTRATION RESOLVED"
#                            console.log "SAVED ADMINISTRATION"
#                            focusarea.get('strategies').pushObject(strategy)
#                            focusarea.save().then ->
#                                console.log "SAVED FOCUSAREA RESOLVED"
#                            console.log "SAVED FOCUSAREA"
#                            console.log "STRATEGY:", strategy
#                            self.set('model', strategy)
#                            self.set('ready', true)
#                            self._super()
                else
                    self.set('model', result.get('firstObject'))
                    self.set('ready', true)
                    self._super()
            catch error
                console.error error
                self._super()