App.ThemesNewController = Ember.ObjectController.extend
    actions:
        submit: ->
            theme = @get('model')
            shouldSave = true

            if Ember.isEmpty(theme.get('definition'))
                @notify.danger "Definition cannot be empty."
                shouldSave = false

            if shouldSave
                theme.save()
                @transitionToRoute('/themes')
            else
                #theme.rollback()
                @transitionToRoute('/themes/new')