App.FocusareasRoute = Ember.Route.extend
    model: (params) ->
        console.log "params:", params
        @store.filter 'focusarea', {}, (focusarea)->
            if focusarea.get('data.theme.id') is params.theme_id
                return true

#        @store.findAll('focusarea').then (allFocusareas) ->
#            allFocusareas.filter (focusarea)->
#            #allFocusareas.filter 'focusarea', {}, (focusarea)->
#                console.log "FOCUSAREA", focusarea
#                #console.log "THEME_ID", focusarea.get('data.theme.id')
#                if focusarea.get('data.theme.id') is params.theme_id
#                    return true

App.FocusareasNewRoute = Ember.Route.extend
    model:  ->
        focusarea = @store.createRecord('focusarea')

App.FocusareasEditRoute = Ember.Route.extend
    model: ->
        @modelFor('focusarea')
