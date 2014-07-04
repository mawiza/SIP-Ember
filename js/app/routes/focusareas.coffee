App.FocusareasRoute = Ember.Route.extend
    model: (params) ->
        App.log('Loading the model for focusarea', 'App.FocusareasRoute.model', params)
        @store.find('focusarea', {theme: params.theme_id})



App.FocusareasNewRoute = Ember.Route.extend
    model:  ->
        @store.createRecord('focusarea')

    afterModel: ->
        @set('theme', @modelFor('theme'))

    setupController: (controller, model) ->
        @_super(controller, model)
        theme_id = @controllerFor('focusareas').get('model').get('query.theme')
        controller.set('theme_id', theme_id)



App.FocusareasEditRoute = Ember.Route.extend
    model: ->
        App.log('Loading the model for focusarea', 'App.FocusareasEditRoute.model')
        @modelFor('focusarea')

    setupController: (controller, model) ->
        @_super(controller, model)
        theme_id = @controllerFor('focusareas').get('model').get('query.theme')
        controller.set('theme_id', theme_id)
