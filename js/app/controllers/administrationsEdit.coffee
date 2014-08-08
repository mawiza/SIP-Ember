#TODO add focus to the first element
App.AdministrationsEditController = Ember.ObjectController.extend
    actions:
        update: ->
            administration = @get('model')
            @utility.updateOrSave(this, administration)

        delete: ->
            alert('Delete disabled')
#            self = this
#            administration = @get('model')
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
#            console.log 'delete administration'
#            #administration.destroyRecord().then ->
#            #    self.transitionToRoute('/administrations')
#
#            self.transitionToRoute('/administrations')

        cancel: ->
            @transitionToRoute('/administrations')