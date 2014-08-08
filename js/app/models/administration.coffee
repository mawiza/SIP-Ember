App.AdministrationSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin).extend(
    attrs:
        strategies:
            serialize: "ids"
            deserialize: "ids"
)

App.Administration = DS.Model.extend
    name: DS.attr('string')
    color: DS.attr('string')
    strategies: DS.hasMany('strategy',
        async: true
    )

#    selectionCount:   Ember.arrayComputed('strategies',
#        initialValue: 0
#        addedItem: (accum, item) ->
#            if item.get('totalResponses')
#                accum += 1
#            else
#                accum -= 1
#        removedItem: (accum, item) ->
#            if item.get('totalResponses')
#                accum -= 1
#    )

#    selectionCount: (->
#        count = 0
#        console.log "COUNT"
#        @get('strategies').then (strategies) ->
#            console.log "RESOLVED", strategies
#            strategies.forEach (strategy) ->
#                if strategy.get('selected')
#                    count += 1
#
#            console.log "COUNT:", count
#        count
#    ).property('strategies.@each.strategy.selected')

    #this does not belong in here - it doesn't have anything to do with the model
    style: (->
        "background-color:" + @get('color') + ";width:200px;display: block; padding: 10px;margin-right: 150px;"
    ).property("color")

    tabStyle: (->
        "background-color:" + @get('color') + ";width: 100%; height: 5px;"
    ).property("color")

    shadedTabStyle: (->
        "background-color:" + @utility.colorLuminance(@get('color'), 0.4) + ";width: 100%; height: 3px;"
    ).property("color")

    hashedID: (->
        "#" + @get('id')
    ).property("id")
