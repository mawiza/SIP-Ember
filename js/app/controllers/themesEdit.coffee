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
                @transitionToRoute('/themes/' + theme.get('id') + '/focusareas')
            else
                @transitionToRoute('/themes/edit')

        delete: ->
            theme = @get('model')

            if @get('focusareasLength') == 0
                self = this
                console.log "theme", theme.get("id")
                App.log('Deleting the theme without focusareas', 'App.ThemesEditController.delete', @get('focusareasLength'))
                theme.destroyRecord().then ->
                    self.transitionToRoute('/themes')
            else
                App.log('Not deleting the theme with focusareas', 'App.ThemesEditController.delete', @get('focusareasLength'))
                @notify.danger "Cannot delete " + theme.get('definition') + ". Please delete all the focus areas related to this theme first."
                @transitionToRoute('/themes/' + theme.get('id') + '/focusareas')

        cancel: ->
            @get('model').rollback()
            @transitionToRoute('/themes/' + @get('model').get('id') + '/focusareas')