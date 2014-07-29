App.FocusareasNewController = Ember.ObjectController.extend
    actions:
        submit: ->
            focusarea = @get('model')
            shouldSave = true
            theme_id = @utility.themeId(window.location.href)

            if Ember.isEmpty(focusarea.get('definition'))
                @notify.danger "Definition cannot be empty."
                shouldSave = false

            if shouldSave
                self = this
                @store.find('theme', theme_id).then (theme) ->
                    focusarea.set('theme', theme)
                    focusarea.save().then ->
                        theme.get('focusareas').pushObject(focusarea)
                        theme.save().then ( (success) ->
                            console.log "SUCCESSFULL SAVE", success
                        ), (error) ->
                            console.log "API error occured - " + error.responseText

                        self.transitionToRoute('/themes/' + theme_id + '/focusareas')

            else
                @transitionToRoute('/themes/' + theme_id + '/focusareas/new')

        cancel: ->
            @transitionToRoute('/themes/' + @utility.themeId(window.location.href) + '/focusareas')