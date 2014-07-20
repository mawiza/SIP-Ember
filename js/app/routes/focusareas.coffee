App.FocusareasRoute = Ember.Route.extend
    model: (params) ->
        @store.findAll('focusarea')

App.FocusareasNewRoute = Ember.Route.extend
    model:  ->
        @store.createRecord('focusarea')

App.FocusareasEditRoute = Ember.Route.extend
    model: ->
        @modelFor('focusarea')
