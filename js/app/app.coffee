App = Ember.Application.create
    LOG_TRANSITIONS: true

App.Router.map ->
    @route('about')
    @route('administrations')
    @route('themes')
    @route('focusareas')

# put your routes here
App.AdministrationsRoute = Ember.Route.extend(
    model: ->
        [
            {
                name: "OPB"
                color: "#000"
            }
            {
                name: "SSB"
                color: "#fff"
            }
        ]
)

