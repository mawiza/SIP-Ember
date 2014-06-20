Ember.Handlebars.helper "capitalize", (value) ->
    if Ember.I18n.exists('notify.' + value)
        return Ember.I18n.t('notify.' + value)
    else
        value.capitalize()

window.App = Ember.Application.create()
    #LOG_TRANSITIONS: true
    #LOG_TRANSITIONS_INTERNAL: true
    #LOG_VIEW_LOOKUPS: true
    #LOG_BINDINGS: true
    #LOG_ACTIVE_GENERATION: true

App.ApplicationAdapter = DS.LSAdapter.extend
    namespace: 'sip'

DS.LSAdapter.create
    namespace: 'sip'
