App.Administration = DS.Model.extend
    name: DS.attr('string')
    color: DS.attr('string')
    strategies: DS.hasMany('strategy',
        async: true
    )
    style: (->
        "background-color:" + @get('color')
    ).property("color")

    tabStyle: (->
        "background-color:" + @get('color') + ";width: 100%; height: 5px;margin-bottom: -5px;"
    ).property("color")