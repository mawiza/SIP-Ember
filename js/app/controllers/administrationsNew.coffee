App.AdministrationsNewController = Ember.ObjectController.extend
    actions:
        submit: ->
            this.transitionToRoute('/administrations')
