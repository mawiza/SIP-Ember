describe 'Themes should', ->

    describe 'should have a model that', ->
        it 'should have a content property', ->
            contentProperty = App.Theme.metaForProperty('definition')
            expect(contentProperty.type).to.equal('string')

        it 'should have a focusareas property', ->
            contentProperty = App.Theme.metaForProperty('focusareas')
            expect(contentProperty.type).to.equal('focusarea')

        it 'can be created', ->
            visit("/themes")
            andThen ->
                Ember.run ->
                    localStorage.clear()
                    store = App.__container__.lookup('store:main')
                    theme = store.createRecord("theme",
                        id: 3
                        definition: 'theme definition'
                    )
                    expect(theme.get('definition')).to.equal('theme definition')

    #
    # Index
    #
    describe 'a themes page', ->
        beforeEach ->
            visit('/themes')

        it 'should have an add new theme button', ->
            findWithAssert('a.add-theme')

        it 'should direct to the new route when clicked', ->
            andThen ->
                click('a.add-theme')
                expect(currentURL()).to.equal('/themes/new')

        it 'should have table with a header and one column', ->
            andThen ->
                findWithAssert('table.table')
                expect(find('table.table thead tr th').length).to.equal(1)

    #
    # NEW
    #
    describe 'a new theme page that', ->
        beforeEach ->
            visit("/themes")

        it 'should have a field and a submit button', ->
            andThen ->
                click('a.add-theme').then ->
                    findWithAssert('form')
                    findWithAssert('#definition')
                    findWithAssert("button.submit-button")
                    findWithAssert("button.cancel-button")

        it 'should be possible to cancel the update', ->
            visit("/themes")
            andThen ->
                click('a.add-theme')
                .then ->
                    click('button.cancel-button')
                    .then ->
                        expect(currentURL()).to.equal('/themes')

        it 'should create a new theme entry when submit gets clicked', ->
            andThen ->
                click('a.add-theme')
                fillIn('#definition', 'theme-definition1')
                .click('button.submit-button')
                .then ->
                    expect(currentURL()).to.equal('/themes')

        it 'should be valid', ->
            visit("/themes/new")
            andThen ->
                fillIn('#definition', '')
                .click('button.submit-button')
                .then ->
                    expect(currentURL()).to.equal('/themes/new')

        it 'should transition to the the themes page', ->
            visit("/themes/new")
            andThen ->
                fillIn('#definition', 'theme-definition2')
                .click('button.submit-button')
                .then ->
                    expect(find('table.table tbody tr').length).to.equal(4)

        it 'should have themes that each can be clicked to be edited', ->
            visit("/themes")
            andThen ->
                findWithAssert('td.theme-definition:contains("theme-definition2") a')


    #
    # Edit
    #
    describe 'an edit theme page that', ->
        beforeEach ->
            visit("/themes")

        it 'should be accessed from the themes page', ->
            andThen ->
                click('td.theme-definition:contains("theme-definition1") a')
                .then ->
                    findWithAssert('form')
                    findWithAssert('#definition')
                    findWithAssert("button.update-button")
                    findWithAssert("button.delete-button")

        it 'should be possible to update the record', ->
            andThen ->
                click('td.theme-definition:contains("theme-definition1") a')
                .then ->
                    fillIn('#definition', 'theme-definition3')
                    .click('button.update-button')
                    .then ->
                        expect(currentURL()).to.equal('/themes')
                        findWithAssert('td.theme-definition:contains("theme-definition3")')


        it 'should be possible to cancel the update', ->
            andThen ->
                click('td.theme-definition:contains("theme-definition3") a')
                .then ->
                    click('button.cancel-button')
                    .then ->
                        expect(currentURL()).to.equal('/themes')


        it 'should be possible to delete the record', ->
            andThen ->
                click('td.theme-definition:contains("theme-definition3") a')
                .then ->
                    click('button.delete-button')
                    .then ->
                        expect(currentURL()).to.equal('/themes')
                        expect(find('table.table tbody tr').length).to.equal(3)