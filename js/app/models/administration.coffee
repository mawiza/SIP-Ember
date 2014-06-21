App.Administration = DS.Model.extend
    name: DS.attr('string')
    color: DS.attr('string')
    style: (->
        "background-color:" + @get('color')
    ).property("color")