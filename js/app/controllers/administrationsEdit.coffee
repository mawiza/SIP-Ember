#TODO add focus to the first element
App.AdministrationsEditController = Ember.ObjectController.extend
    actions:
        update: ->
            administration = @get('model')
            @utility.updateOrSave(this, administration)

        delete: ->
            self = this
            administration = @get('model')
            administration.destroyRecord().then ->
                self.transitionToRoute('/administrations')

        cancel: ->
            @transitionToRoute('/administrations')