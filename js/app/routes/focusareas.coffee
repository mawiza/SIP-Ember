App.FocusareasRoute = Ember.Route.extend
    model: (params) ->
        @store.findAll('focusarea')

    afterModel: (model) ->
        theme_id = @utility.themeId(window.location.href)
        self = this
        Ember.RSVP.hash(
            #focusareas: @store.find('focusarea', {theme: theme_id})
            focusareas: @store.findAll('focusarea')
        ).then (results) ->
            console.log results.focusareas
            self.controllerFor('focusareas').set('model', results.focusareas)

App.FocusareasNewRoute = Ember.Route.extend
    model:  ->
        @store.createRecord('focusarea')

App.FocusareasEditRoute = Ember.Route.extend
    model: ->
        @modelFor('focusarea')
