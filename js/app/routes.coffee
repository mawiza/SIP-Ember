App.Router.map ->
    @resource("administrations")
    @resource("administrations.new", {path:'/administrations/new'})
    @route('about')
    @route('themes')
    @route('focusareas')

#App.AdministrationsRoute = Ember.Route.extend
#    model: ->
#        this.store.find('administrations')

#App.AdministrationsRoute = Ember.Route.extend
#    model: ->
#        this.store.find('administration')


App.AdministrationsNewRoute = Ember.Route.extend
    model: ->
        this.store.createRecord('administration')

    actions:
        submit: ->
            console.log("Hell Yeah")
            this.transitionTo('/administrations')

