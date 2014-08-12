App.AdministrationsNewController = Ember.ObjectController.extend
    actions:
        submit: ->
            administration = @get('model')
            shouldSave = true

            if Ember.isEmpty(administration.get('name'))
                @notify.danger "Name cannot be empty."
                shouldSave = false

            #A real crappy way of doing this
            count = 0
            @store.all('administration').forEach (record) ->
                if(record.get('name') is administration.get('name'))
                    count += 1

            if count > 1
                @notify.danger administration.get('name') + " is already used."
                shouldSave = false

            if Ember.isEmpty(administration.get('color'))
                @notify.danger "Color cannot be empty."
                shouldSave = false

            if shouldSave
                administration.save().then ->
                    @transitionToRoute('/administrations')

        cancel: ->
            @transitionToRoute('/administrations')