App.AdministrationController = Ember.ArrayController.extend
    needs: "strategies"
    strategies: Ember.computed.alias("controllers.strategies")
