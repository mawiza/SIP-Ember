App.FocusareasNewController = Ember.ObjectController.extend
    actions:
        submit: ->
            focusarea = @get('model')
            shouldSave = true
            theme_id = @utility.idFromURL(window.location.href)

            if Ember.isEmpty(focusarea.get('definition'))
                @notify.danger "Definition cannot be empty."
                shouldSave = false

            if shouldSave
                self = this
                @store.find('theme', theme_id).then (theme) ->
                    focusarea.set('theme', theme)
                    focusarea.save().then ->
                        theme.get('focusareas').pushObject(focusarea)
                        theme.save().then ->
                            self.transitionToRoute('/themes/' + theme_id + '/focusareas')

            else
                @transitionToRoute('/themes/' + theme_id + '/focusareas/new')

        cancel: ->
            @transitionToRoute('/themes/' + @utility.idFromURL(window.location.href) + '/focusareas')