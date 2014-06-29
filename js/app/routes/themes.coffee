App.ThemesIndexRoute = Ember.Route.extend
    model: ->
        @store.find('theme')

    afterModel: (themes, transition) ->
        @transitionTo "/themes/" + themes.get("firstObject").get('id') + "/focusareas"

#App.ThemesRoute = Ember.Route.extend
#    model: ->
#        @store.find('theme')
#
#    afterModel: (themes, transition) ->
#        @transitionTo "/themes/" + themes.get("firstObject").get('id') + "/focusareas"

App.ThemesNewRoute = Ember.Route.extend
    model: ->
        @store.createRecord('theme')

App.ThemesEditRoute = Ember.Route.extend
    model: (params) ->
        @modelFor('theme', params)
