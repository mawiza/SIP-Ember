App.AdministrationsRoute = Ember.Route.extend
    model: ->
        @store.find('administration')

App.AdministrationsNewRoute = Ember.Route.extend
    model: ->
        @store.createRecord('administration')

App.AdministrationsEditRoute = Ember.Route.extend
    model: ->
        @modelFor('administration')