#TODO Clicking cancel should transition to browser.history.back
App.FocusareasNewController = Ember.ObjectController.extend
    needs: ['focusareas']
    actions:
        submit: ->
            focusarea = @get('model')
            shouldSave = true

            if Ember.isEmpty(focusarea.get('definition'))
                @notify.danger "Definition cannot be empty."
                shouldSave = false

            if shouldSave
                @store.find('theme', @get('theme_id')).then (theme) ->
                    theme.get("focusareas").then (focusareas) ->
                        focusareas.pushObject focusarea
                        theme.save()
                        focusarea.save()

                @transitionToRoute('/themes/' + @get('theme_id') + '/focusareas')
            else
                @transitionToRoute('/themes/' + @get('theme_id') + '/focusareas/new')

        cancel: ->
            @transitionToRoute('/themes/' + @get('theme_id') + '/focusareas')