App.GraphRoute = Ember.Route.extend
    model: ->
        @store.findAll('strategy')
        #@store.filter 'strategy', {}, (strategy)->
        #    return strategy.get('data.selected')
