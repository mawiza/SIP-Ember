App.StrategiesRoute = Ember.Route.extend
    model: (params) ->
        @store.findAll('administration')

    afterModel: (administrations, transition) ->
        if administrations.get("firstObject")?
            administration_id = administrations.get("firstObject").get('id')
            @transitionTo "/strategies/administration/" + administration_id
            #$('#' + administration_id).addClass('active') #TODO
