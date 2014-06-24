#TODO add focus to the first element
App.FocusareasEditController = Ember.ObjectController.extend
    actions:
        update: ->
            focusarea = @get('model')
            shouldSave = true

            if Ember.isEmpty(focusarea.get('definition'))
                @notify.danger "Definition cannot be empty."
                shouldSave = false

            if shouldSave
                focusarea.save()
                @transitionToRoute('/focusareas')
            else
                @transitionToRoute('/focusareas/edit')

        delete: ->
            administration = @get('model')
            administration.destroyRecord()
            @transitionToRoute('/focusareas')

        cancel: ->
            @transitionToRoute('/focusareas')