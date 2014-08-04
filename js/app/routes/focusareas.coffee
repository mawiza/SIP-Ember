App.FocusareasRoute = Ember.Route.extend
    model: (params) ->
        @store.filter 'focusarea', {}, (focusarea)->
            if focusarea.get('data.theme.id') is params.theme_id
                return true

App.FocusareasNewRoute = Ember.Route.extend
    model:  ->
        focusarea = @store.createRecord('focusarea')

App.FocusareasEditRoute = Ember.Route.extend
    model: ->
        @modelFor('focusarea')
