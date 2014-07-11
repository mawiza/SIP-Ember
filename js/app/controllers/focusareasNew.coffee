#TODO Clicking cancel should transition to browser.history.back
App.FocusareasNewController = Ember.ObjectController.extend
    actions:
        submit: ->
            focusarea = @get('model')
            shouldSave = true

            if Ember.isEmpty(focusarea.get('definition'))
                @notify.danger "Definition cannot be empty."
                shouldSave = false

            if shouldSave
                self = this
                @store.find('theme', @get('theme_id')).then (theme) ->
                    focusarea.set('theme', theme)
                    focusarea.save().then ->
                        self.transitionToRoute('/themes/' + theme.get('id') + '/focusareas')


            else
                @transitionToRoute('/themes/' + @get('theme_id') + '/focusareas/new')

        cancel: ->
            @transitionToRoute('/themes/' + @get('theme_id') + '/focusareas')