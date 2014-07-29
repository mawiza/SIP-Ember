App.Strategy = DS.Model.extend
    description: DS.attr('string')
    administration: DS.belongsTo('administration',
        embedded: true
    )
    focusarea: DS.belongsTo('focusarea',
        embedded: true
    )