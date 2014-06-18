App.AdministrationsNewController = Ember.ObjectController.extend
    actions:
        submit: ->
            administration = @get('model')
            administration.save()
            this.transitionToRoute('/administrations')