#TODO add focus to the first element
App.AdministrationsEditController = Ember.ObjectController.extend
    actions:
        update: ->
            administration = @get('model')
            @utility.updateOrSave(this, administration)

        delete: ->
            administration = @get('model')
            administration.destroyRecord()
            @transitionToRoute('/administrations')

        cancel: ->
            @transitionToRoute('/administrations')