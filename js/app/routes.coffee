App.Router.map ->
    @resource("administrations")
    @resource("administrations.new", {path:'/administrations/new'})
    @route('about')
    @route('themes')
    @route('focusareas')


App.AdministrationsRoute = Ember.Route.extend
    model: ->
        this.store.all('administration')


App.AdministrationsNewRoute = Ember.Route.extend
    model: ->
        this.store.createRecord('administration')
