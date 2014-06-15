App = Ember.Application.createWithMixins(Bootstrap,
    LOG_TRANSITIONS: true
    LOG_TRANSITIONS_INTERNAL: true
    LOG_VIEW_LOOKUPS: true
    LOG_BINDINGS: true
    LOG_ACTIVE_GENERATION: true
)

App.Router.map ->
    @resource "administrations", ->
        @route("new")
    @route('about')
    @route('themes')
    @route('focusareas')

App.AdministrationsController = Ember.Controller.extend
    showModal: ->
        Bootstrap.ModalManager.show 'administrationsNewModal'

App.AdministrationsNewController = Ember.Controller.extend
    modalButtons: [
        Ember.Object.create(
            title: "Submit"
            clicked: "submit"
        )
        Ember.Object.create(
            title: "Cancel"
            clicked: "cancel"
            dismiss: "modal"
        )
    ]
