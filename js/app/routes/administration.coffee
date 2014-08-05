App.AdministrationRoute = Ember.Route.extend
    model: (params) ->
        @store.findAll('theme')
