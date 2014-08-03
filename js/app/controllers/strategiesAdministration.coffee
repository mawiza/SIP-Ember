App.StrategiesAdministrationController = Ember.ArrayController.extend
    needs: "strategies"
    strategies: Ember.computed.alias("controllers.strategies")
