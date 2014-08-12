App.AdministrationsEditController = Ember.ObjectController.extend
    actions:
        update: ->
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

        delete: ->
            self = this
            administration = @get('model')
#            @store.find('strategy',
#                administration: administration.get('id')
#            ).then (strategies) ->
#                console.log "Strategies:", Ember.inspect strategies
#                strategies.forEach (strategy) ->
#                    focusarea = strategy.get('focusarea')
#                    #console.log "FOCUSAREA", Ember.inspect focusarea
#                    console.log "FOCUSAREA-STRATEGIES: LENGTH", focusarea.get("strategies").get('length')
##                    focusarea.get('strategies').removeObject(strategy).then ->
##                        console.log "removed the strategy"
##                        focusarea.save().then ->
##                            console.log "FOCUSAREA-STRATEGIES: LENGTH", focusarea.get("strategies").get('length')
##                            strategy.destroyRecord()
##                            #console.log "ADMINISTRATION-STRATEGIES: LENGTH", administration.get("strategies").get('length')
##                            #administration.get('strategies').removeObject(strategy).then ->
##                            #    administration.save().then ->
##                            #        strategy.destroyRecord()
#
            console.log 'delete administration'
            administration.destroyRecord().then ->
                self.transitionToRoute('/administrations')
#
#            self.transitionToRoute('/administrations')

        cancel: ->
            @transitionToRoute('/administrations')