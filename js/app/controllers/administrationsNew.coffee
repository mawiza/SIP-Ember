App.AdministrationsNewController = Ember.ObjectController.extend
    actions:
        submit: ->
            #this.store.save()
            this.transitionToRoute('/administrations')
