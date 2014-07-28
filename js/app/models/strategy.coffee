App.Strategy = DS.Model.extend
    description: DS.attr('string')
    administration: DS.belongsTo('administration',
        async: true
    )
    focusarea: DS.belongsTo('focusarea',
        async: true
    )