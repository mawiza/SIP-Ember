App.AdministrationStrategyController = Ember.ObjectController.extend
    strategy: null
    init: ->
        focusarea = @get('model')
        administration_id = @utility.idFromURL(window.location.href)
        console.log "(", administration_id , ")", focusarea.get('id')

        #we create the strategy if it does not exist,
        #but we need to clean it up as well, when we
        #delete an administration or a focusarea.
        self = this
        strategy = @store.find("strategy",
            focusarea: focusarea.get('id')
            administration: administration_id
        ).then (value) ->
            console.log "FOUND:", value.get('length')
            if value.get('length') == 0
                console.log "LOADING ADMINISTRATION..."
                self.store.find('administration', administration_id).then (administration) ->
                    console.log "CREATING..."
                    strategy = self.store.createRecord('strategy',
                        description: "TEST:" + administration_id
                        isSelected: true
                        administration: administration_id
                        focusarea: focusarea.get('id')
                    )
                    console.log "SAVING..."

                    strategy.save().then ->
                        console.log "SAVING AND PUSHING..."
                        administration.get('strategies').pushObject(strategy)
                        administration.save()

                        focusarea.get('strategies').pushObject(strategy)
                        focusarea.save()

                        console.log "STRATEGY:", strategy
                        self.set('strategy', strategy)
            else
                console.log "VALUE:", value
                self.set('strategy', value)
