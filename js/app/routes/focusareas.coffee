App.FocusareasRoute = Ember.Route.extend
    model: (params) ->
        @store.find('focusarea', {theme: params.theme_id})

App.FocusareasNewRoute = Ember.Route.extend
    model: ->
        @store.createRecord('focusarea')

    afterModel: (theme, transition) ->
        console.log "theme.id: " + theme.id
        #@store.find('focusarea').then (focusarea)->
        #    focusarea.set('theme', theme.id)

        #model.set('theme', theme)

App.FocusareasEditRoute = Ember.Route.extend
    model: ->
        @modelFor('focusarea')

    setupController: (controller, model) ->
        @_super(controller, model)
        controller.set('availableThemes', @store.find('theme'))
        model.get('theme').then (theme) ->
            controller.set('selectedTheme', theme.get('id'))
