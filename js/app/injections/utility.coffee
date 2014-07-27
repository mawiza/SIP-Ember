Ember.Utility = Ember.Object.extend(
    updateOrSave: (controller, administration) ->
        shouldSave = true

        if Ember.isEmpty(administration.get('name'))
            controller.notify.danger "Name cannot be empty."
            shouldSave = false

        #A real crappy way of doing this
        count = 0
        controller.store.all('administration').forEach (record) ->
            if(record.get('name') is administration.get('name'))
                count += 1
        if count > 1
            controller.notify.danger administration.get('name') + " is already used."
            shouldSave = false

        if Ember.isEmpty(administration.get('color'))
            controller.notify.danger "Color cannot be empty."
            shouldSave = false

        if shouldSave
            administration.save().then ->
                controller.transitionToRoute('/administrations')
        else
            #administration.rollback()
            controller.transitionToRoute('/administrations/new')

    themeId: (currentUrl)->
        regex = /\/themes\/(.*)\/focusareas/
        result = regex.exec(currentUrl) || ["", null]
        console.log "THEME_ID ->", result[1]
        return result[1]
)

Ember.Application.initializer
    name: "registerUtilities"
    initialize: (container, application) ->
        application.register "utility:main", Ember.Utility
        return

Ember.Application.initializer
    name: "injectUtilities"
    initialize: (container, application) ->
        application.inject "controller", "utility", "utility:main"
        application.inject "route", "utility", "utility:main"
        return
