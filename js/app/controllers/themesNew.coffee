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
                @transitionToRoute('/themes/' + theme.get('id') + '/focusareas')
            else
                @transitionToRoute('/themes/new')

        cancel: ->
            @get('model').rollback()
            @transitionToRoute('/themes')