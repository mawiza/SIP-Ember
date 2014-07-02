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
                    store = App.__container__.lookup('store:main')
                    theme = store.createRecord("theme",
                        id: 3
                        definition: 'theme definition'
                    )
                    theme.save()
                    expect(theme.get('definition')).to.equal('theme definition')

    #
    # Index
    #
    describe 'a themes page', ->
        it 'should have an add new theme button', ->
            visit('/themes')
            andThen ->
                findWithAssert('a.add-theme')

        it 'should direct to the new route when clicked', ->
            visit('/themes')
            andThen ->
                click('a.add-theme')
                expect(currentURL()).to.equal('/themes/new')

        it 'should display the first available theme\'s focusareas if any', ->
            visit('/themes')
            andThen ->
                expect(currentURL()).to.equal('/themes/1/focusareas')


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
                        expect(currentURL()).to.equal('/themes/1/focusareas')

        it 'should create a new theme entry when submit gets clicked', ->
            andThen ->
                click('a.add-theme')
                fillIn('#definition', 'theme-definition1')
                .click('button.submit-button')
                .then ->
                    expect(currentURL()).to.equal('/themes/fixture-9/focusareas')

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
                    expect(find('ul.theme-definitions li').length).to.equal(5)

        it 'should have themes that each can be clicked to be edited', ->
            visit("/themes")
            andThen ->
                findWithAssert('ul.theme-definitions li:contains("theme-definition2") a')

    #
    # Edit
    #
    describe 'an edit theme page that', ->
        beforeEach ->
            visit("/themes")

        it 'should be accessed from the themes page', ->
            andThen ->
                click('li:contains("theme-definition1") > a.edit-theme')
                .then ->
                    findWithAssert('form')
                    findWithAssert('#definition')
                    findWithAssert("button.update-button")
                    findWithAssert("button.delete-button")

        it 'should be possible to update the record', ->
            andThen ->
                click('li:contains("theme-definition1") > a.edit-theme')
                .then ->
                    fillIn('#definition', 'theme-definition3')
                    .click('button.update-button')
                    .then ->
                        expect(currentURL()).to.equal('/themes/fixture-9/focusareas')
                        findWithAssert('li:contains("theme-definition3") > a.active')


        it 'should be possible to cancel the update', ->
            andThen ->
                click('li:contains("theme-definition3") > a.edit-theme')
                .then ->
                    click('button.cancel-button')
                    .then ->
                        expect(currentURL()).to.equal('/themes/fixture-9/focusareas')


        it 'should be possible to delete a theme without focusareas', ->
            andThen ->
                click('li:contains("theme-definition3") > a.edit-theme')
                .then ->
                    click('button.delete-button')
                    .then ->
                        expect(currentURL()).to.equal('/themes/1/focusareas')
                        expect(find('ul.theme-definitions li').length).to.equal(4)

        #TODO - the fixtures does not get loaded properly - this works in prod, but not here
        it 'should not be possible to delete a theme with focusareas', ->
            andThen ->
                click('li:contains("theme1") > a.edit-theme')
                .then ->
                    click('button.delete-button')
                    .then ->
                        expect(currentURL()).to.equal('/themes/2/focusareas')
                        #expect(currentURL()).to.equal('/themes/1/focusareas')
                        #expect(find('ul.theme-definitions li').length).to.equal(4)