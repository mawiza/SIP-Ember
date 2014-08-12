App.AdministrationsNewController = Ember.ObjectController.extend
    actions:
        submit: ->
            administration = @get('model')
            shouldSave = true

            if Ember.isEmpty(administration.get('name'))
                @notify.danger "Name cannot be empty."
                shouldSave = false

            #A real crappy way of doing this
            count = 0
            @store.all('administration').forEach (record) ->
                if(record.get('name') is administration.get('name'))
                    count += 1

            if count > 1
                @notify.danger administration.get('name') + " is already used."
                shouldSave = false

            if Ember.isEmpty(administration.get('color'))
                @notify.danger "Color cannot be empty."
                shouldSave = false

            if shouldSave
                self = this
                administration.save().then ->
                    self.transitionToRoute('/administrations')

#                #calling save to get the id from the server
#                administration.save().then ->
#                    console.log "Creating strategies"
#                    self.store.findAll('focusarea').then (focusareas) ->
#                        focusareas.forEach (focusarea) ->
#                            console.log "create strategy for", administration, "and", focusarea
#                            strategy = self.store.createRecord('strategy'
#                                description: ''
#                                administration: administration
#                                focusarea: focusarea
#                                selected: false
#                            )
#                            console.log "Saving the strategy"
#                            strategy.save().then ->
#                                console.log "saving the administration"
#                                administration.get('strategies').then (strategies)->
#                                    strategies.pushObject(strategy)
#                                    administration.save().then ->
#                                        console.log "saved the administration"
#
#                                console.log "saving the focusarea"
#                                focusarea.get('strategies').then (strategies)->
#                                    strategies.pushObject(strategy)
#                                    focusarea.save().then ->
#                                        console.log "saved the focusarea"
#
#                            self.transitionToRoute('/administrations')

        cancel: ->
            @get('model').rollback()
            @transitionToRoute('/administrations')