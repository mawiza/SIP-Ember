App.ThemesNewController = Ember.ObjectController.extend
    actions:
        submit: ->
            theme = @get('model')
            shouldSave = true

            if Ember.isEmpty(theme.get('definition'))
                @notify.danger "Definition cannot be empty."
                shouldSave = false

            if shouldSave
                self = this
                theme.save().then (savedTheme) ->
                    App.log('Saving the theme and transitioning to the theme\'s focusareas', 'App.ThemesNewController.submit', savedTheme.get("id"))
                    self.transitionToRoute('/themes/' + theme.get('id') + '/focusareas')
            else
                @transitionToRoute('/themes/new')

        cancel: ->
            @get('model').rollback()
            @transitionToRoute('/themes')