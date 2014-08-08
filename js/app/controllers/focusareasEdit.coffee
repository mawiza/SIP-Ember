App.FocusareasEditController = Ember.ObjectController.extend
    actions:
        update: ->
            focusarea = @get('model')
            shouldSave = true
            theme_id = @utility.idFromURL(window.location.href)

            if Ember.isEmpty(focusarea.get('definition'))
                @notify.danger "Definition cannot be empty."
                shouldSave = false

            if not theme_id?
                @notify.danger "You have to create themes before creating focus areas!"
                shouldSave = false

            if shouldSave
                self = this
                @store.find('theme', theme_id).then (theme) ->
                    focusarea.set('theme', theme)
                    focusarea.save().then ->
                        self.transitionToRoute('/themes/' + theme_id + '/focusareas')
            else
                @transitionToRoute('/themes/' + theme_id + '/focusareas/edit')

        delete: ->
            alert('Delete disabled')
#            self = this
#            focusarea = @get('model')
#            theme = focusarea.get('theme')
#            theme.get('focusareas').removeObject(focusarea)
#            theme.save().then ->
#                focusarea.destroyRecord().then ->
#                    self.transitionToRoute('/themes/' + self.utility.idFromURL(window.location.href) + '/focusareas')

        cancel: ->
            @get('model').rollback()
            @transitionToRoute('/themes/' + @utility.idFromURL(window.location.href) + '/focusareas')