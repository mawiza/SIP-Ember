App.Focusarea = DS.Model.extend
    definition: DS.attr('string')
    theme: DS.belongsTo('theme',
        async: true
    )