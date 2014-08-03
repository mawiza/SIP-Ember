App.StrategiesRoute = Ember.Route.extend
    model: (params) ->
        @store.findAll('administration')

    afterModel: (administrations, transition) ->
        if administrations.get('length') != 0
            administration_id = administrations.get("firstObject").get('id')
            @transitionTo "/strategies/administration/" + administration_id
        else
            @transitionTo "/administrations/new"
