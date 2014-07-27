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
        it 'theme should have an add new focusarea button', ->
            visit('/themes')
            andThen ->
                click('ul.theme-definitions li:contains("theme definition created in focusareas spec") a.select-theme')
                .then ->
                    findWithAssert('ul.theme-definitions li:contains("theme definition created in focusareas spec") a.active')
                    findWithAssert('a.add-focusarea')

        it 'should direct to the new route when clicked', ->
            visit('/themes')
            andThen ->
                click('ul.theme-definitions li:contains("theme definition created in focusareas spec") a.select-theme')
                .click('a.add-focusarea')
                .then ->
                    expect(currentURL()).to.match(/^\/themes\/.*\/focusareas\/new$/)

        it 'should have focus areas that each can be clicked to be edited', ->
            visit('/themes')
            andThen ->
                click('ul.theme-definitions li:contains("theme definition created in focusareas spec") a.select-theme')
                .then ->
                    findWithAssert('ul.focusarea-definitions li:contains("focusarea definition created calling createRecord") a')

#        it 'should not be possible to delete a theme with focusareas', ->
#            visit('/themes')
#            andThen ->
#                click('ul.theme-definitions li:contains("theme definition created in focusareas spec") a.edit-theme')
#                .then ->
#                    click('button.delete-button')
#                    .then ->
#                        findWithAssert('ul.focusarea-definitions li:contains("focusarea definition created calling createRecord")')


    #
    # NEW
    #
    describe 'a new focusarea page that', ->
        it 'should have a field and a submit button', ->
            visit("/themes")
            andThen ->
                click('a.add-focusarea').then ->
                    findWithAssert('form')
                    findWithAssert('#definition')
                    findWithAssert("button.submit-button")

        it 'should create a new focusarea entry when submit gets clicked', ->
            visit("/themes")
            andThen ->
                click('a.add-focusarea')
                fillIn('#definition', 'focusarea-definition1')
                .click('button.submit-button')
                .then ->
                    expect(currentURL()).to.match(/^\/themes\/.*\/focusareas$/)

        it 'should be valid', ->
            visit("/themes")
            andThen ->
                click('a.add-focusarea')
                .fillIn('#definition', '')
                .click('button.submit-button')
                .then ->
                    expect(currentURL()).to.match(/^\/themes\/.*\/focusareas\/new$/)

        it 'should transition to the the themes page of the added focusarea', ->
            visit('/themes')
            andThen ->
                click('ul.theme-definitions li:contains("theme definition created in focusareas spec") a.select-theme')
                .click('a.add-focusarea')
                .fillIn('#definition', 'focusarea-definition2')
                .click('button.submit-button')
                .then ->
                    expect(find('ul.focusarea-definitions li').length).to.equal(2)

        it 'should have focusareas that each can be clicked to be edited', ->
            visit('/themes')
            andThen ->
                click('ul.theme-definitions li:contains("theme definition created in focusareas spec") a.select-theme')
                .then ->
                    findWithAssert('ul.focusarea-definitions li:contains("focusarea-definition2") a')


    #
    # Edit
    #
    describe 'an edit focusarea page that', ->
        it 'should be accessed from the focusareas page', ->
            visit("/themes")
            andThen ->
                click('ul.theme-definitions li:contains("theme definition created in focusareas spec") a.select-theme')
                .click('ul.focusarea-definitions li:contains("focusarea-definition2") a')
                .then ->
                    findWithAssert('form')
                    findWithAssert('#definition')
                    findWithAssert("button.update-button")
                    findWithAssert("button.delete-button")

        it 'should be possible to update the record', ->
            visit("/themes")
            andThen ->
                click('ul.theme-definitions li:contains("theme definition created in focusareas spec") a.select-theme')
                .click('ul.focusarea-definitions li:contains("focusarea-definition2") a')
                .then ->
                    fillIn('#definition', 'focusarea-definition3')
                    .click('button.update-button')
                    .then ->
                        expect(currentURL()).to.match(/^\/themes\/.*\/focusareas$/)
                        findWithAssert('ul.focusarea-definitions li:contains("focusarea-definition3") a')


        it 'should be possible to cancel the update', ->
            visit("/themes")
            andThen ->
                click('ul.theme-definitions li:contains("theme definition created in focusareas spec") a.select-theme')
                .click('ul.focusarea-definitions li:contains("focusarea-definition3") a')
                .then ->
                    fillIn('#definition', 'focusarea-definition4')
                    click('button.cancel-button')
                    .then ->
                        expect(currentURL()).to.match(/^\/themes\/.*\/focusareas$/)
                        findWithAssert('ul.focusarea-definitions li:contains("focusarea-definition3") a')


        it 'should be possible to delete the record', ->
            visit("/themes")
            andThen ->
                click('ul.theme-definitions li:contains("theme definition created in focusareas spec") a.select-theme')
                .click('ul.focusarea-definitions li:contains("focusarea-definition3") a')
                .then ->
                    fillIn('#definition', 'focusarea-definition3')
                    click('button.delete-button')
                    .then ->
                        expect(currentURL()).to.match(/^\/themes\/.*\/focusareas$/)
                        expect(find('ul.focusarea-definitions li').length).to.equal(1)