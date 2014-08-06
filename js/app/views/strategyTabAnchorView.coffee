App.StrategyTabAnchorView = Ember.View.extend
    tagName: "a"
    didInsertElement: ->
        @.$().attr("href", "#/strategies/administration/" + @get('administration_id'))

    #click: ->
    #    $('.strategies-administrations-tab').removeClass('active')
    #    $('#' + @get("administration_id")).addClass('active')
