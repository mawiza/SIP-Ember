App.ThemesEditController = Ember.ObjectController.extend
    actions:
        update: ->
            theme = @get('model')
            shouldSave = true

            if Ember.isEmpty(theme.get('definition'))
                @notify.danger "Definition cannot be empty."
                shouldSave = false

            if shouldSave
                theme.save()
                @transitionToRoute('/themes/' + theme.get('id') + '/focusareas')
            else
                @transitionToRoute('/themes/edit')

        delete: ->
            theme = @get('model')
            #console.log theme.get('focusareas'), Ember.inspect theme.get('focusareas')
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