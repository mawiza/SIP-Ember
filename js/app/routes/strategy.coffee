App.StrategyRoute = Ember.Route.extend
    model: (params) ->
        #find it
        #if not found
        #create it

        console.log "-------------->", params
        administration = @store.find('administration', params.get('administration_id'))
        #focusarea = @store.find('focusarea', params.get('focusarea_id'))

        #strategy = @store.createRecord('strategy'
        #    administration: administration
        #    focusarea: focusarea
        #)

        #strategy.save().then ->
        #    administration.get('strategies').pushObject(strategy)
        #    administration.save()

        #    focusarea.get('strategies').pushObject(strategy)
        #    focusarea.save()