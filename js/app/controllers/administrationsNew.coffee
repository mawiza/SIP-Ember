App.AdministrationsNewController = Ember.ObjectController.extend
    actions:
        submit: ->
            administration = @get('model')
            shouldRedirect = true

            if Ember.isEmpty(administration.get('name'))
                @notify.danger "Name cannot be empty."
                shouldRedirect = false

            #A real crappy way of doing this
            count = 0
            @store.all('administration').forEach (record) ->
                if(record.get('name') is administration.get('name'))
                    count += 1
            if count > 1
                @notify.danger administration.get('name') + " is already used."
                shouldRedirect = false

            if Ember.isEmpty(administration.get('color'))
                @notify.danger "Color cannot be empty."
                shouldRedirect = false

            if shouldRedirect
                administration.save()
                @transitionToRoute('/administrations')
            else
                return
