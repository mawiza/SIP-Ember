App.StrategyTabPaneView = Ember.View.extend
    tagName: "div"
    classNames: ['strategies-administrations-tab tab-pane']
    classNameBindings: ['isActive:active']

    isActive: ( ->
        @get('firstObject').get('id') == @get('administration_id')
    ).property("controller.model")
