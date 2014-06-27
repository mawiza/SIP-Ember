#TODO Clicking cancel should transition to browser.history.back
App.FocusareasNewController = Ember.ObjectController.extend
    actions:
        submit: ->
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
                @transitionToRoute('/focusareas/new')

        cancel: ->
            @transitionToRoute('/focusareas')