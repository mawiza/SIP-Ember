App.FocusareasRoute = Ember.Route.extend
    model: (params)->
        console.log params.id
        @store.find('theme', params.id).then (theme) ->
            theme.get('focusareas').then (focusareas) ->
                console.log focusareas.get('length')
                return focusareas

#    model: (params) ->
#        console.log params.get('id')
#        @store.find('theme', params).then (theme) ->
#            console.log theme.get('definition')
#            return theme.get('focusareas')


App.FocusareasNewRoute = Ember.Route.extend
    model: ->
        @store.createRecord('focusarea')

    setupController: (controller, model) ->
        @_super(controller, model)
        controller.set('availableThemes', @store.find('theme'))
        controller.set('selectedTheme', @store.find('theme')[0])

App.FocusareasEditRoute = Ember.Route.extend
    model: ->
        @modelFor('focusarea')

    setupController: (controller, model) ->
        @_super(controller, model)
        controller.set('availableThemes', @store.find('theme'))
        model.get('theme').then (theme) ->
            controller.set('selectedTheme', theme.get('id'))
