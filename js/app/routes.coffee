App.Router.map ->
    @resource("administrations")
    @resource("administrations.new", {path:'/administrations/new'})
    @resource("administrations.edit", {path:'/administrations/edit/:id'})
    @route('about')
    @route('themes')
    @route('focusareas')


App.AdministrationsRoute = Ember.Route.extend
    model: ->
        this.store.find('administration')


App.AdministrationsNewRoute = Ember.Route.extend
    model: ->
        this.store.createRecord('administration')

App.AdministrationsEditRoute = Ember.Route.extend
    model: ->
        @modelFor('administration')