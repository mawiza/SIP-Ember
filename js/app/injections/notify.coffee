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

Ember.Application.initializer
    name: "registerNotifyMessages"
    initialize: (container, application) ->
        application.register "notify:main", Ember.Notify
        return

Ember.Application.initializer
    name: "injectNotifyMessages"
    initialize: (container, application) ->
        application.inject "controller", "notify", "notify:main"
        application.inject "component", "notify", "notify:main"
        application.inject "route", "notify", "notify:main"
        return
