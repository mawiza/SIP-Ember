App.FocusareasRoute = Ember.Route.extend
    model: ->
        @store.all('focusarea').forEach (model) ->
            if model and model.get("isDirty")
                model.rollback()

        @store.find('focusarea')

App.FocusareasNewRoute = Ember.Route.extend
    model: ->
        @store.createRecord('focusarea')

App.FocusareasEditRoute = Ember.Route.extend
    model: ->
        @modelFor('focusarea')