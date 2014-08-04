App.StrategyTabPaneView = Ember.View.extend
    #<div class="" {{bind-attr id=administration.id}}>
    tagName: "div"
    classNames: ['strategies-administrations-tab tab-pane fade in']
    classNameBindings: ['isActive:active']

    isActive: ( ->
        @get('firstObject').get('id') == @get('administration_id')
    ).property("controller.model")
