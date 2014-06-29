#TODO add focus to the first element
App.FocusareasEditController = Ember.ObjectController.extend
    needs: ['focusareas']
    actions:
        update: ->
            focusarea = @get('model')
            shouldSave = true

            if Ember.isEmpty(focusarea.get('definition'))
                @notify.danger "Definition cannot be empty."
                shouldSave = false

            if not @get('theme_id')?
                @notify.danger "You have to create themes before creating focus areas!"
                shouldSave = false

            if shouldSave
                @store.find('theme', @get('theme_id')).then (theme) ->
                    theme.get("focusareas").then (focusareas) ->
                        focusareas.pushObject focusarea
                        theme.save()
                        focusarea.save()

                @transitionToRoute('/themes/' + @get('theme_id') + '/focusareas')
            else
                @transitionToRoute('/themes/' + @get('theme_id') + '/focusareas/edit')

        delete: ->
            administration = @get('model')
            administration.destroyRecord()
            @transitionToRoute('/themes/' + @get('theme_id') + '/focusareas')

        cancel: ->
            @get('model').rollback()
            @transitionToRoute('/themes/' + @get('theme_id') + '/focusareas')