App.Theme = DS.Model.extend
    definition: DS.attr('string')
    focusareas: DS.hasMany('focusarea',
        async: true
    )