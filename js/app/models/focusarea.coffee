App.FocusareaSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin).extend(
    attrs:
        strategies:
            serialize: "ids"
            deserialize: "ids"
)

App.Focusarea = DS.Model.extend
    definition: DS.attr('string')
    theme: DS.belongsTo('theme',
        embedded: true
    )
    strategies: DS.hasMany('strategy',
        async: true
    )
    hashedID: (->
        "#" + @get('id')
    ).property("id")