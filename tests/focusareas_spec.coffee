describe 'Focusareas should', ->
    before: ->
        Ember.run ->
            store = App.__container__.lookup('store:main')
            store.find('themes')
            store.find('focusareas')


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
                        definition: 'theme definition created in focusareas spec'
                    )

                    theme.save().then ->
                        focusarea = store.createRecord("focusarea",
                            definition: 'focusarea definition created calling createRecord'
                            theme: theme
                        )

                        focusarea.save().then ->
                            theme.get("focusareas").then (focusareas)->
                                focusareas.pushObject(focusarea)
                                expect(theme.get('focusareas').get('length')).to.equal(1)

    #
    # Index
    #
    describe 'a focusareas page', ->
        it 'theme should be active and have an add new focusarea button', ->
            visit('/themes')
            andThen ->
                click('li:contains("theme definition created in focusareas spec")')
                .then ->
                    findWithAssert('ul.theme-definitions li:contains("theme definition created in focusareas spec")')
                    findWithAssert('ul.theme-definitions li:contains("theme definition created in focusareas spec") a.active')
                    findWithAssert('a.add-focusarea')

        it 'should direct to the new route when clicked', ->
            visit('/themes')
            andThen ->
                click('li:contains("theme definition created in focusareas spec")')
                .click('a.add-focusarea')
                .then ->
                    expect(currentURL()).to.match(/^\/themes\/.*\/focusareas\/new$/)

        it 'should have focus areas that each can be clicked to be edited', ->
            visit('/themes')
            andThen ->
                click('li:contains("theme definition created in focusareas spec")')
                .then ->
                    findWithAssert('ul.focusarea-definitions li:contains("focusarea definition created calling createRecord") a')

        it 'should not be possible to delete a theme with focusareas', ->
            andThen ->
                click('li:contains("focusarea definition created calling createRecord") > a.edit-theme')
                .then ->
                    click('button.delete-button')
                    .then ->
                        expect(currentURL()).to.match(/^\/themes\/.*\/focusareas$/)
                        findWithAssert('ul.focusarea-definitions li:contains("focusarea definition created calling createRecord") a')


    #
    # NEW
    #
    describe 'a new focusarea page that', ->
        it 'should have a field, a select box and a submit button', ->
            visit("/themes")
            andThen ->
                click('a.add-focusarea').then ->
                    findWithAssert('form')
                    findWithAssert('#definition')
                    findWithAssert('select.focusarea-theme')
                    findWithAssert("button.submit-button")

        it 'should create a new focusarea entry when submit gets clicked', ->
            visit("/themes")
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


    #
    # Edit
    #
    describe 'an edit focusarea page that', ->
        it 'should be accessed from the focusareas page', ->
            visit("/themes")
            andThen ->
                click('td.focusarea-definition:contains("focusarea-definition1") a')
                .then ->
                    findWithAssert('form')
                    findWithAssert('#definition')
                    findWithAssert("button.update-button")
                    findWithAssert("button.delete-button")

        it 'should be possible to update the record', ->
            visit("/themes")
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
            visit("/themes")
            andThen ->
                click('td.focusarea-definition:contains("focusarea-definition3") a')
                .then ->
                    click('button.cancel-button')
                    .then ->
                        expect(currentURL()).to.equal('/focusareas')


        it 'should be possible to delete the record', ->
            visit("/themes")
            andThen ->
                click('td.focusarea-definition:contains("focusarea-definition3") a')
                .then ->
                    click('button.delete-button')
                    .then ->
                        expect(currentURL()).to.equal('/focusareas')
                        expect(find('table.table tbody tr').length).to.equal(6)