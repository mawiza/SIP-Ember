App.ThemesEditController = Ember.ObjectController.extend
    actions:
        update: ->
            theme = @get('model')
            shouldSave = true

            if Ember.isEmpty(theme.get('definition'))
                @notify.danger "Definition cannot be empty."
                shouldSave = false

            if shouldSave
                console.log "Finding the focusareas"
                #this is just so damn unnecessary
                #when I save, it saves only the updated text, but removes all the focusareas????
#                self.store.find("focusarea", theme.get('focusarea.id')).then (focusarea) ->
#                    console.log "focusarea->", focusarea
#                    theme.get('focusareas').then (focusareas) ->
#                        found = false
#                        focusareas.forEach (savedFocusarea) ->
#                            if savedFocusarea.get('id') == focusarea.get('id')
#                                found = true
#                        unless found
#                            #console.log "NOT FOUND"
#                            focusareas.pushObject (focusarea)
#                            theme.save().then ->
#                                console.log "SAVED FOCUSAREA RESOLVED"

                console.log "saving the theme"
                theme.save()
                @transitionToRoute('/themes/' + theme.get('id') + '/focusareas')
            else
                @transitionToRoute('/themes/edit')

        delete: ->
            theme = @get('model')
            self = this
            theme.get('focusareas').then (focusareas) ->
                if focusareas.get('length') == 0
                    theme.destroyRecord().then ->
                        self.transitionToRoute('/themes')
                else
                    self.notify.danger "Cannot delete " + theme.get('definition') + ". Please delete all the focus areas related to this theme first."
                    self.transitionToRoute('/themes/' + theme.get('id') + '/focusareas')

        cancel: ->
            @get('model').rollback()
            @transitionToRoute('/themes/' + @get('model').get('id') + '/focusareas')