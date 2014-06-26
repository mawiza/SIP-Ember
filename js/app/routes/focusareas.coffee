App.FocusareasRoute = Ember.Route.extend
    model: ->
        @store.all('focusarea').forEach (model) ->
            if model and model.get("isDirty")
                model.rollback()

        @store.find('focusarea')

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

    #setupController: (controller, model) ->
    #    @_super(controller, model)
    #    controller.set('themes', @store.find('theme',
    #        focusarea: model
    #    ))