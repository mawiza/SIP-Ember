App.FocusareasRoute = Ember.Route.extend
    model: (params) ->
        @store.find('focusarea', {theme: params.theme_id})

App.FocusareasIndexRoute = Ember.Route.extend
    model: (params) ->
        @store.find('focusarea', {theme: params.theme_id})

App.FocusareasNewRoute = Ember.Route.extend
    model: ->
        @store.createRecord('focusarea')

    setupController: (controller, model) ->
        @_super(controller, model)
        theme_id = @controllerFor('focusareas').get('model').get('query.theme')
        controller.set('theme_id', theme_id)

App.FocusareasEditRoute = Ember.Route.extend
    model: ->
        @modelFor('focusarea')


