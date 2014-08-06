App.StrategyTabAnchorView = Ember.View.extend
    tagName: "a"
    didInsertElement: ->
        @.$().attr("href", "#/strategies/administration/" + @get('administration_id'))
