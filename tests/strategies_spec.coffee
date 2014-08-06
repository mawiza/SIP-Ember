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
                            theme.get("focusareas").addObject(focusarea)
                            theme.save()


                            strategy = store.createRecord('strategy'
                                description: 'Strategy description'
                                administration: administration
                                focusarea: focusarea
                            )


                            strategy.save().then ->
                                administration.get('strategies').pushObject(strategy)
                                administration.save()

                                focusarea.get('strategies').pushObject(strategy)
                                focusarea.save()

                wait(500) #need to wait otherwise we get a record inFlight error


    #
    # Index
    #
    describe 'a strategy page that', ->
        it 'should have a list of administration tabs', ->
            visit("/strategies")
            andThen ->
                expect(find('ul.strategies-administrations-tabs li').length).to.equal(3)

        it 'should have a list of administration tabs that each can be selected', ->
            visit("/strategies")
            andThen ->
                click('ul.strategies-administrations-tabs li a')
                .then ->
                    expect(find('ul.strategies-administrations-tabs li').length).to.equal(3)


        it 'should direct to the new route when clicked', ->
            visit("/strategies")
            andThen ->
                click('ul.strategies-administrations-tabs li:contains("administration created in strategies spec") a')
                .then ->
                    expect(currentURL()).to.match(/^\/strategies\/administration\/.*$/)


        it 'should have a list of themes', ->
            visit('/strategies')
            andThen ->
                click('ul.strategies-administrations-tabs li:contains("administration created in strategies spec") a')
                .then ->
                    expect(find('div.strategies-administrations-tab.active div.strategies-theme').length).to.equal(4)


        it 'should have a list of focusareas', ->
            visit('/strategies')
            andThen ->
                click('ul.strategies-administrations-tabs li:contains("administration created in strategies spec") a')
                .then ->
                    expect(find('div.strategies-focusarea').length).to.equal(2)

        it 'should have a list of focusareas that can be checked', ->
            visit('/strategies')
            andThen ->
                click('ul.strategies-administrations-tabs li:contains("administration created in strategies spec") a')
                .then ->
                    click('div.strategies-administrations-tab.active label.strategy-focusarea:contains("focusarea created in strategies spec") input')
                    .then ->
                        visit('/strategies')
                        .andThen ->
                            click('ul.strategies-administrations-tabs li:contains("administration created in strategies spec") a')
                            .then ->
                                expect(find('div.strategies-administrations-tab.active label.strategy-focusarea:contains("focusarea created in strategies spec") input').is(':checked')).equal(true)
