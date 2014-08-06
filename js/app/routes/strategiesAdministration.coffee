App.StrategiesAdministrationRoute = Ember.Route.extend
    model: (params) ->
        Ember.Object.create(
            administration: @store.find('administration', params.administration_id)
            themes: @store.findAll('theme')
        )

    setupController: (controller, model) ->
        controller.set('administration', model.administration)
        controller.set('themes', model.themes)
