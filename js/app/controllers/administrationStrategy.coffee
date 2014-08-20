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
                #console.log "FOUND:", result.get('length')
                self.set "_buffers", Ember.Map.create()
                if result.get('length') == 0
                    ##console.log "CREATING..."
                    administration.then (administration) ->
                        strategy = self.store.createRecord('strategy',
                            isSelected: false
                            administration: administration
                            focusarea: focusarea
                        )
                        ##console.log "SAVING..."

                        #this creates inconsistency when we update the administration
                        #this does not affect the focusare, but it will eventually,
                        #what happens is that when we call update, we cannot control the
                        #order the request are made in, in other words, we risk a admin
                        #call with two strategies that gets called, with one that has 3 strategies,
                        #where two of them are different from the existing strategies already
                        #saved, that then will replace the two not found with the two that
                        #already exits. So I need to create all the strategies, then
                        #update the administrations and the focusareas.
                        #This needs to be done in each the focusarea and the administration
                        #creation. In other words, we create a strategy when an administration
                        #gets created for every focusarea available, the same for when we create a
                        #a focusarea, we create a strategy for every existing administration.
                        #update - have the same issue when creating an administration

                        strategy.save().then ->
                            ##console.log "SAVING AND PUSHING..."
                            administration.get('strategies').then (strategies) ->
                                strategies.pushObject(strategy)
                                administration.save().then ->
                                    #console.log "SAVED ADMINISTRATION RESOLVED"

                            focusarea.get('strategies').then (strategies) ->
                                strategies.pushObject(strategy)
                                focusarea.save().then ->
                                    #console.log "SAVED FOCUSAREA RESOLVED"

                            ##console.log "STRATEGY:", strategy
                            self.set('model', strategy)
                            self.set('ready', true)
                            self._super()
                else
                    strategy = result.get('firstObject')

                    ##
                    ## code start
                    ##
                    ## This needs to be moved - this is an unoptimized way of doing this
                    ## The strategies needs to be created properly from the start.
                    ##
                    ##console.log strategy.get('administration.id')
                    self.store.find("administration", strategy.get('administration.id')).then (administration) ->
                        ##console.log "administration->", administration
                        administration.get('strategies').then (strategies) ->
                            found = false
                            strategies.forEach (savedStrategy) ->
                                if savedStrategy.get('id') == strategy.get('id')
                                    found = true
                            unless found
                                ##console.log "NOT FOUND"
                                strategies.pushObject (strategy)
                                administration.save().then ->
                                    #console.log "SAVED ADMINISTRATION RESOLVED"

                    self.store.find("focusarea", strategy.get('focusarea.id')).then (focusarea) ->
                        #console.log "focusarea->", focusarea
                        focusarea.get('strategies').then (strategies) ->
                            found = false
                            strategies.forEach (savedStrategy) ->
                                if savedStrategy.get('id') == strategy.get('id')
                                    found = true
                            unless found
                                ##console.log "NOT FOUND"
                                strategies.pushObject (strategy)
                                focusarea.save().then ->
                                    #console.log "SAVED FOCUSAREA RESOLVED"
                    ##
                    ## code end
                    ##

                    self.set('model', strategy)
                    self.set('ready', true)
                    self._super()
            catch error
                #console.error error
                self._super()