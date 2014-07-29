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
        if result?
            result = regex.exec(App.__container__.lookup('router:main').get('url')) || ["", null]
        return result[1]

    #http://www.sitepoint.com/javascript-generate-lighter-darker-color/
    colorLuminance: (hex, lum) ->
        # validate hex string
        hex = String(hex).replace(/[^0-9a-f]/g, "")
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]  if hex.length < 6
        lum = lum or 0

        # convert to decimal and change luminosity
        rgb = "#"
        c = undefined
        i = undefined
        i = 0
        while i < 3
            c = parseInt(hex.substr(i * 2, 2), 16)
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
            rgb += ("00" + c).substr(c.length)
            i++
        rgb
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
        application.inject "model", "utility", "utility:main"
        return
