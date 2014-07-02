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
                @transitionToRoute('/themes/' + theme.get('id') + '/focusareas')
            else
                @transitionToRoute('/themes/edit')

        delete: ->
            theme = @get('model')
            notify = @notify

            if @get('focusareasLength') == 0
                theme.destroyRecord()
                @transitionToRoute('/themes')
            else
                notify.danger "Cannot delete " + theme.get('definition') + ". Please delete all the focus areas related to this theme first."
                @transitionToRoute('/themes/' + theme.id + '/focusareas')

        cancel: ->
            @get('model').rollback()
            @transitionToRoute('/themes/' + @get('model').get('id') + '/focusareas')