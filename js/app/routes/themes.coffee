App.ThemesRoute = Ember.Route.extend
    model: ->
        @store.find('theme')

App.ThemesNewRoute = Ember.Route.extend
    model: ->
        @store.createRecord('theme')

App.ThemesEditRoute = Ember.Route.extend
    model: (params) ->
        @modelFor('theme', params)
