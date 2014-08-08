App.Strategy = DS.Model.extend App.AutosavableModel,
    description: DS.attr('string')
    selected: DS.attr('boolean')
    administration: DS.belongsTo('administration',
        embedded: true
    )
    focusarea: DS.belongsTo('focusarea',
        embedded: true
    )
