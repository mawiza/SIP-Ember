App.StrategySerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin).extend(
    attrs:
        strategies:
            serialize: "ids"
            deserialize: "ids"
)

App.Strategy = DS.Model.extend
    description: DS.attr('string')
    selected: DS.attr('boolean')
    administration: DS.belongsTo('administration',
        embedded: true
    )
    focusarea: DS.belongsTo('focusarea',
        embedded: true
    )