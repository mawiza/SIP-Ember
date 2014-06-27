#TODO add focus to the first element
App.FocusareasEditController = Ember.ObjectController.extend
    actions:
        update: ->
            focusarea = @get('model')
            shouldSave = true
            themeId = @get('selectedTheme')

            if Ember.isEmpty(focusarea.get('definition'))
                @notify.danger "Definition cannot be empty."
                shouldSave = false

            if not themeId?
                @notify.danger "You have to create themes before creating focus areas!"
                shouldSave = false

            if shouldSave
                @store.find('theme', themeId).then (theme) ->
                    theme.get("focusareas").then (focusareas) ->
                        focusareas.pushObject focusarea
                        theme.save()
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