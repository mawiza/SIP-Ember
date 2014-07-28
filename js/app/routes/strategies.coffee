App.StrategiesRoute = Ember.Route.extend
    model: (params) ->
        @store.findAll('administration')

    afterModel: (administrations, transition) ->
        if administrations.get("firstObject")?
            @transitionTo "/strategies/administration/" + administrations.get("firstObject").get('id')