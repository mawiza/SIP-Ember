App.ThemesRoute = Ember.Route.extend
    model: ->
        this.store.all('theme').forEach (model) ->
            if model and model.get("isDirty")
                model.rollback()

        this.store.find('theme')

App.ThemesNewRoute = Ember.Route.extend
    model: ->
        this.store.createRecord('theme')

App.ThemesEditRoute = Ember.Route.extend
    model: ->
        @modelFor('theme')