App = Ember.Application.create
	LOG_TRANSITIONS: true
App.Router.map ->
	@route('about')
	@route('administrations')
	@route('themes')
	@route('focusareas')

# put your routes here
App.IndexRoute = Ember.Route.extend(model: ->
  [
    "red"
    "yellow"
    "blue"
  ]
)