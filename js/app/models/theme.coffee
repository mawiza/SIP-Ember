App.Theme = DS.Model.extend
    content: DS.attr('string')
    focusareas: DS.hasMany('focusarea',
        async: true
    )