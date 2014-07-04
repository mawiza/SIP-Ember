Ember.Handlebars.helper "capitalize", (value) ->
    if Ember.I18n.exists('notify.' + value)
        return Ember.I18n.t('notify.' + value)
    else
        value.capitalize()

window.App = Ember.Application.create
    #LOG_TRANSITIONS: true
    #LOG_TRANSITIONS_INTERNAL: true
    #LOG_VIEW_LOOKUPS: true
    #LOG_BINDINGS: true
    #LOG_ACTIVE_GENERATION: true

    LOG_DEBUG: true

    log: (message, location, data) ->
        if @LOG_DEBUG
            if data?
                data = Ember.inspect(data)  if typeof data is "object"
                console.log "DEBUG: " + @appName + " : " + location + " : " + message
                console.log "DEBUG: " + @appName + " : (continued) data: " + data
            else
                console.log "DEBUG: " + @appName + " : " + location + " : " + message

App.ApplicationAdapter = DS.LSAdapter.extend
    namespace: 'sip'

DS.LSAdapter.create
    namespace: 'sip'
