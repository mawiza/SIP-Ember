#App.FocusareasIndexRoute = Ember.Route.extend
#    model: ->
#        @store.find('theme')
#
#    afterModel: (themes, transition) ->
#        @transitionTo "/themes/" + themes.get("firstObject").get('id') + "/focusareas"

App.FocusareasRoute = Ember.Route.extend
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

    setupController: (controller, model) ->
        @_super(controller, model)
        #theme_id = @controllerFor('focusareas').get('model').get('query.theme')
        #controller.set('theme_id', theme_id)
        model.get('theme').then (theme) ->
            controller.set('theme_id', theme.get('id'))
