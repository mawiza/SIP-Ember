describe 'Strategies should', ->

    #
    # Model
    #
    describe 'have a model that', ->
        it 'should have a description property', ->
            descriptionProperty = App.Strategy.metaForProperty('description')
            expect(descriptionProperty.type).to.equal('string')

        it 'should have a administration property', ->
            administrationProperty = App.Strategy.metaForProperty('administration')
            expect(administrationProperty.type).to.equal('administration')

        it 'should have a focusarea property', ->
            focusareaProperty = App.Strategy.metaForProperty('focusarea')
            expect(focusareaProperty.type).to.equal('focusarea')

        it 'can be created', ->
            Ember.run ->
                store = App.__container__.lookup('store:main')
                administration = store.createRecord("administration",
                    name: 'administration created in strategies spec'
                    color: '#000'
                )

                administration.save().then ->
                    theme = store.createRecord("theme",
                        definition: 'theme created in strategies spec'
                    )

                    theme.save().then ->
                        focusarea = store.createRecord("focusarea",
                            definition: 'focusarea created in strategies spec'
                            theme: theme
                        )

                        focusarea.save().then ->
                            theme.get("focusareas").then (focusareas)->
                                focusareas.pushObject(focusarea)

                            strategy = store.createRecord('strategy'
                                description: 'Strategy description'
                                administration: administration
                                focusarea: focusarea
                            )

                            strategy.save().then ->
                                administration.get('strategies').then (strategies) ->
                                    strategies.pushObject(strategy)

                                focusarea.get('strategies').then (strategies) ->
                                    strategies.pushObject(strategy)


    #
    # Index
    #
    describe 'a strategy page that', ->

        it 'should have a list of administration tabs', ->
            visit("/strategies")
            andThen ->
                expect(find('ul.administrations-tabs li').length).to.equal(1)

        it 'should have a list of administration tabs that each can be selected', ->
            visit("/strategies")
            andThen ->
                click('ul.administrations-tabs li a')
                expect(find('ul.administrations-tabs li').length).to.equal(1)



#        it 'should direct to the new route when clicked', ->
#            visit("/administrations")
#            andThen ->
#                click('a.add-administration')
#                .then ->
#                    expect(currentURL()).to.equal('/administrations/new')
#
#        it 'should have table with a header and two columns', ->
#            visit("/administrations")
#            andThen ->
#                findWithAssert('table.table')
#                expect(find('table.table thead tr th').length).to.equal(2)


