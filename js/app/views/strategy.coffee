App.StrategyView = Ember.View.extend
    templateName: 'strategy'
    controllerName: 'App.StrategyController'

    didInsertElement: ->
        #@get('focusarea')
        #@get('administration')
        #when checked we save th checked value
        #need to load the value when has been checked
        #save the text....

    keyPress: ->
        console.log "keypress"

    click: ->
        console.log "click"


    #valueChanged: (->
    #    @set 'formDirty', !Ember.empty(@value)
    #).observes('value')