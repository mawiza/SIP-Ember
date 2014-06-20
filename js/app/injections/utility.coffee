Ember.Utility = Ember.Object.extend(
    updateOrSave: (obj, administration) ->
        shouldSave = true

        if Ember.isEmpty(administration.get('name'))
            obj.notify.danger "Name cannot be empty."
            shouldSave = false

        #A real crappy way of doing this
        count = 0
        obj.store.all('administration').forEach (record) ->
            if(record.get('name') is administration.get('name'))
                count += 1
        if count > 1
            obj.notify.danger administration.get('name') + " is already used."
            shouldSave = false

        if Ember.isEmpty(administration.get('color'))
            obj.notify.danger "Color cannot be empty."
            shouldSave = false

        if shouldSave
            administration.save()
            obj.transitionToRoute('/administrations')
        else
            obj.transitionToRoute('/administrations/new')
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
        return
