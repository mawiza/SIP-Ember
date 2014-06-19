Ember.Application.initializer
    name: "registerNotifyMessages"
    initialize: (container, application) ->
        application.register "notify:main", Ember.Notify
        return

Ember.Notify = Ember.ArrayProxy.extend(
    content: Ember.A()
    timeout: 5000
    pushObject: (object) ->
        object.typeClass = "alert-" + object.type
        @_super object
        return
    danger: (message) ->
        @pushObject
            type: "danger"
            message: message
        return
    warning: (message) ->
        @pushObject
            type: "warning"
            message: message
        return
    info: (message) ->
        @pushObject
            type: "info"
            message: message
        return
    success: (message) ->
        @pushObject
            type: "success"
            message: message
        return
)

Ember.Handlebars.helper "capitalize", (value) ->
    if Ember.I18n.exists('notify.' + value)
        return Ember.I18n.t('notify.' + value)
    else
        value.capitalize()

Ember.Application.initializer
    name: "injectNotifyMessages"
    initialize: (container, application) ->
        application.inject "controller", "notify", "notify:main"
        application.inject "component", "notify", "notify:main"
        application.inject "route", "notify", "notify:main"
        return

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

App.XNotifyComponent = Ember.Component.extend(
    classNames: "notify-messages"
    messages: Ember.computed.alias("notify")
)
App.XNotifyMessageComponent = Ember.Component.extend(
    classNames: ["x-notify-message-container"]
    classNameBindings: ["insertState"]
    insertState: "pre-insert"
    didInsertElement: ->
        self = this
        self.$().bind "webkitTransitionEnd", (event) ->
            self.notify.removeObject self.get("message")  if self.get("insertState") is "destroyed"
            return

        Ember.run.later (->
            self.set "insertState", "inserted"
            return
        ), 250

        if self.notify.timeout
            Ember.run.later (->
                self.set "insertState", "destroyed"
                return
            ), self.notify.timeout
        return

    click: ->
        self = this
        self.set "insertState", "destroyed"
        return
)