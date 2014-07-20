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
                console.log "saving"
                @store.find('theme', theme_id).then (theme) ->
                    focusarea.set('theme', theme)
                    console.log "setting the theme"
                    focusarea.save().then ->
                        console.log "transitioning to: ", theme_id
                        self.transitionToRoute('/themes/' + theme_id + '/focusareas')

            else
                @transitionToRoute('/themes/' + theme_id + '/focusareas/new')

        cancel: ->
            @transitionToRoute('/themes/' + @utility.themeId(window.location.href) + '/focusareas')