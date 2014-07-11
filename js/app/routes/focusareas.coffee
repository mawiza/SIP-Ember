App.FocusareasRoute = Ember.Route.extend
    model: (params) ->
        App.log('PARAMS', 'App.FocusareasRoute.model', params)
        @store.find('focusarea', {theme: params.theme_id})

    afterModel: (focusareas, transition) ->
        console.log focusareas
        #focusareas.reload()
        #@modelFor('focusarea').reload()

    setupController: (controller, model) ->
        @_super(controller, model)
        theme_id = controller.get('model').get('query.theme')
        controller.set('theme_id', theme_id)

App.FocusareasNewRoute = Ember.Route.extend
    model:  ->
        @store.createRecord('focusarea')

    setupController: (controller, model) ->
        @_super(controller, model)
        theme_id = @controllerFor('focusareas').get('model').get('query.theme')
        controller.set('theme_id', theme_id)

App.FocusareasEditRoute = Ember.Route.extend
    model: ->
        @modelFor('focusarea')

    setupController: (controller, model) ->
        @_super(controller, model)
        theme_id = @controllerFor('focusareas').get('model').get('query.theme')
        controller.set('theme_id', theme_id)
