App.StrategiesAdministrationRoute = Ember.Route.extend
    model: (params) ->
        console.log "StrategiesAdministrationRoute params:", params

        @store.findAll('theme')
