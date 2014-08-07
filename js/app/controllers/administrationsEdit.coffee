#TODO add focus to the first element
App.AdministrationsEditController = Ember.ObjectController.extend
    actions:
        update: ->
            administration = @get('model')
            @utility.updateOrSave(this, administration)

        delete: ->
            self = this
            administration = @get('model')
#            strategies = administration.get('strategies')
#            strategies.then (strategy) ->
#                if strategy?
#                    strategy.get('focusarea').then (focusarea) ->
#                        console.log 'found focusarea', focusarea.get('id')
#                        focusarea.removeObject(strategy)
#                        console.log 'removed strategy'
#                        focusarea.save().then ->
#                            console.log 'saved focusarea'
#                            strategy.destroyRecord()
#                            console.log 'delete strategy'


            @store.find('strategy',
                administration: administration
            ).then (strategies) ->
                console.log strategies

            console.log 'delete administration'
#            administration.destroyRecord().then ->
#                self.transitionToRoute('/administrations')

        cancel: ->
            @transitionToRoute('/administrations')