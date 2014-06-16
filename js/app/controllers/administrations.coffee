App.AdministrationsController = Ember.Controller.extend
    actions:
        showModal: ->
            console.log("Fireing showModal")
            #child = this.get('controllers.administrationsNew')
            #child.showModal()

App.AdministrationsNewController = Ember.Controller.extend
    actions:
        showModal: ->
            console.log("showModal clicked!!")
            Bootstrap.ModalManager.show 'administrationsNewModal'

        submit: ->
            console.log("submit")

        cancel: ->
            console.log("close")
            transitionTo('administrations')

    modalButtons: [
        Ember.Object.create(
            title: "Submit"
            clicked: "submit"
        )
        Ember.Object.create(
            title: "Cancel"
            clicked: "cancel"
            dismiss: "modal"
        )
    ]
