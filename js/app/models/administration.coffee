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
    style: (->
        "background-color:" + @get('color')
    ).property("color")

    tabStyle: (->
        "background-color:" + @get('color') + ";width: 100%; height: 5px;"
    ).property("color")

    shadedTabStyle: (->
        "background-color:" + @utility.colorLuminance(@get('color'), 0.4) + ";width: 100%; height: 3px;"
    ).property("color")