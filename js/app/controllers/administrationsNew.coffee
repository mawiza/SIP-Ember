#TODO add focus to the first element
App.AdministrationsNewController = Ember.ObjectController.extend
    actions:
        submit: ->
            administration = @get('model')
            @utility.updateOrSave(this, administration)

        cancel: ->
            @transitionToRoute('/administrations')