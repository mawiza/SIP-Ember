App.AdministrationsRoute = Ember.Route.extend
    model: ->
        # Stale entries in the model - need to clean it up before we load it
        # It gets stale when the back buttons gets clicked when we were on the
        # AdministrationsNew page - the unsaved entries are still served
        # when we load the index page - that could maybe work for other
        # situations, but not for the current one.
        @store.all('administration').forEach (model) ->
            if model and model.get("isDirty")
                model.rollback()

        @store.find('administration')

App.AdministrationsNewRoute = Ember.Route.extend
    model: ->
        @store.createRecord('administration')

App.AdministrationsEditRoute = Ember.Route.extend
    model: ->
        @modelFor('administration')