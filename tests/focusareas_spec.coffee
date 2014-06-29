describe 'Focusareas should', ->

    describe 'should have a model that', ->
        it 'should have a content property', ->
            contentProperty = App.Focusarea.metaForProperty('definition')
            expect(contentProperty.type).to.equal('string')

        it 'should have a focusareas property', ->
            contentProperty = App.Focusarea.metaForProperty('theme')
            expect(contentProperty.type).to.equal('theme')

        it 'can be created', ->
            visit("/themes")
            andThen ->
                Ember.run ->
                    store = App.__container__.lookup('store:main')

                    theme = store.createRecord("theme",
                        id: 4
                        definition: 'theme definition'
                    )

                    focusarea = store.createRecord("focusarea",
                        id: 5
                        definition: 'focusarea definition'
                    )
                    focusarea.save()

                    theme.get("focusareas").then (focusareas) ->
                        focusareas.pushObject focusarea
                        theme.save()

                    expect(focusarea.get('definition')).to.equal('focusarea definition')

                    store.find('theme', 4).then (theme)->
                        theme.get('focusareas').then ->
                            expect(theme.get('focusareas').get('length')).to.equal(1)

    #
    # Index
    #
    describe 'a focusareas page', ->
        it 'should have an add new focusarea button', ->
            visit('/themes/4/focusareas')
            andThen ->
                findWithAssert('a.add-focusarea')

        it 'should direct to the new route when clicked', ->
            visit('/themes/4/focusareas')
            andThen ->
                click('a.add-focusarea')
                expect(currentURL()).to.equal('/themes/4/focusareas/new')

        it 'should have focus areas that each can be clicked to be edited', ->
            visit('/themes/4/focusareas')
            andThen ->
                findWithAssert('ul.focusarea-definitions li:contains("focusarea definition") a')

    #
    # NEW
    #
    describe 'a new focusarea page that', ->
        beforeEach ->
            visit("/focusareas")

        it 'should have a field, a select box and a submit button', ->
            andThen ->
                click('a.add-focusarea').then ->
                    findWithAssert('form')
                    findWithAssert('#definition')
                    findWithAssert('select.focusarea-theme')
                    findWithAssert("button.submit-button")

        it 'should create a new focusarea entry when submit gets clicked', ->
            andThen ->
                click('a.add-focusarea')
                fillIn('#definition', 'focusarea-definition1')
                .fillIn('select.focusarea-theme', '4')
                .click('button.submit-button')
                .then ->
                    expect(currentURL()).to.equal('/focusareas')

        it 'should be valid', ->
            visit("/focusareas/new")
            andThen ->
                fillIn('#definition', '')
                .click('button.submit-button')
                .then ->
                    expect(currentURL()).to.equal('/focusareas/new')

        it 'should transition to the the focusareas page', ->
            visit("/focusareas/new")
            andThen ->
                fillIn('#definition', 'focusarea-definition2')
                .fillIn('select.focusarea-theme', '4')
                .click('button.submit-button')
                .then ->
                    expect(find('table.table tbody tr').length).to.equal(7)

        it 'should have focusareas that each can be clicked to be edited', ->
            visit("/focusareas")
            andThen ->
                findWithAssert('td.focusarea-definition:contains("focusarea-definition2") a')
                #findWithAssert('td.theme-definition:contains("theme definition")')


    #
    # Edit
    #
    describe 'an edit focusarea page that', ->
        beforeEach ->
            visit("/focusareas")

        it 'should be accessed from the focusareas page', ->
            andThen ->
                click('td.focusarea-definition:contains("focusarea-definition1") a')
                .then ->
                    findWithAssert('form')
                    findWithAssert('#definition')
                    findWithAssert("button.update-button")
                    findWithAssert("button.delete-button")

        it 'should be possible to update the record', ->
            andThen ->
                click('td.focusarea-definition:contains("focusarea-definition1") a')
                .then ->
                    fillIn('#definition', 'focusarea-definition3')
                    .fillIn('select.focusarea-theme', '4')
                    .click('button.update-button')
                    .then ->
                        expect(currentURL()).to.equal('/focusareas')
                        findWithAssert('td.focusarea-definition:contains("focusarea-definition3")')


        it 'should be possible to cancel the update', ->
            andThen ->
                click('td.focusarea-definition:contains("focusarea-definition3") a')
                .then ->
                    click('button.cancel-button')
                    .then ->
                        expect(currentURL()).to.equal('/focusareas')


        it 'should be possible to delete the record', ->
            andThen ->
                click('td.focusarea-definition:contains("focusarea-definition3") a')
                .then ->
                    click('button.delete-button')
                    .then ->
                        expect(currentURL()).to.equal('/focusareas')
                        expect(find('table.table tbody tr').length).to.equal(6)