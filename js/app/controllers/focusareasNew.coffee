App.FocusareasNewController = Ember.ObjectController.extend
    actions:
        submit: ->
            focusarea = @get('model')
            shouldSave = true

            if Ember.isEmpty(focusarea.get('definition'))
                @notify.danger "Definition cannot be empty."
                shouldSave = false

            if shouldSave
                focusarea.save()
                @transitionToRoute('/focusareas')
            else
                #focusarea.rollback()
                @transitionToRoute('/focusareas/new')

        cancel: ->
            @transitionToRoute('/focusareas')