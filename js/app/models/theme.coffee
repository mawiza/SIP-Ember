App.ThemeSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin).extend(
    attrs:
        focusareas:
            serialize: "ids"
            deserialize: "ids"
)

App.Theme = DS.Model.extend
    definition: DS.attr('string')
    focusareas: DS.hasMany('focusarea',
        async: true
    )