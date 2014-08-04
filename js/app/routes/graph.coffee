App.GraphRoute = Ember.Route.extend
    model: ->
        @store.findAll('strategy')