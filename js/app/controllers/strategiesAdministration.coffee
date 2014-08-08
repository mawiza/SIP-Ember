App.StrategiesAdministrationController = Ember.ArrayController.extend
    needs: "strategies"
    strategies: Ember.computed.alias("controllers.strategies")

#    selectionCount: ( (focusarea) ->
#        console.log "CALLED"
#        count = 0
#
#        #get all the strategies from administration
#        #get all the focusareas from the selected theme
#        #get all the strategies from the themes' focusareas
#        #match the focusarea strategies with the administration strategies
#        #count those selected
##        strategies = @get('administration').get('strategies')
##        strategies.forEach (strategy) ->
##            if strategy.get('selected') and strategy.get('focusarea').get('id') = focusarea.get('id')
##                count += 1
##        count
#    ).property("administration.@each.strategies")