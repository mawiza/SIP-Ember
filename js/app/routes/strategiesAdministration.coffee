App.StrategiesAdministrationRoute = Ember.Route.extend
    model: (params) ->
        @store.findAll('theme')

    afterModel: (themes, transition) ->
        #create the strategies for each of the focusareas and asign
        #it to that focusarea and the selected administration.

        #I have to clean it up as well