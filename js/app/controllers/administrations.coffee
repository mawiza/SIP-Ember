App.AdministrationsController = Ember.ArrayController.extend
    administrationsCount: (->
        length = this.get('model.length')
        if not length
            return 0
        else return length
    ).property('@each')


