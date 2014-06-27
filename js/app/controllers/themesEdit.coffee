#TODO add focus to the first element
App.ThemesEditController = Ember.ObjectController.extend
    actions:
        update: ->
            theme = @get('model')
            shouldSave = true

            if Ember.isEmpty(theme.get('definition'))
                @notify.danger "Definition cannot be empty."
                shouldSave = false

            if shouldSave
                theme.save()
                @transitionToRoute('/themes')
            else
                @transitionToRoute('/themes/edit')

        delete: ->
            administration = @get('model')
            administration.destroyRecord()
            @transitionToRoute('/themes')

        cancel: ->
            @get('model').rollback()
            @transitionToRoute('/themes')