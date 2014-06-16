App.Router.map ->
    @resource "administrations", ->
        @route("new")
    @route('about')
    @route('themes')
    @route('focusareas')

App.AdministrationsRoute = Ember.Route.extend
    mode: ->
        ''
    #afterModel: ->
    #    Bootstrap.ModalManager.show 'administrationsNewModal'