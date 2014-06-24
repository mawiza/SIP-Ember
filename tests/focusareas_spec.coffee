describe 'Focusareas should', ->
    before ->
        Ember.run ->
            App.Theme.FIXTURES = [
                {
                    id: 1
                    definition: "theme1"
                    focusareas: [1,2]
                }
                {
                    id: 2
                    definition: "theme2"
                    focusareas: [3,4]
                }
            ]

            App.Focusarea.FIXTURES = [
                {
                    id: 1
                    definition: "focusarea1"
                    theme: 1
                }
                {
                    id: 2
                    definition: "focusarea2"
                    theme: 1
                }
                {
                    id: 3
                    definition: "focusarea3"
                    theme: 2
                }
                {
                    id: 4
                    definition: "focusarea4"
                    theme: 2
                }
            ]

    describe 'should have a model that', ->
        it 'should have a content property', ->
            contentProperty = App.Focusarea.metaForProperty('definition')
            expect(contentProperty.type).to.equal('string')

        it 'should have a focusareas property', ->
            contentProperty = App.Focusarea.metaForProperty('theme')
            expect(contentProperty.type).to.equal('theme')

        it 'can be created', ->
            visit("/focusareas")
            andThen ->
                Ember.run ->
                    localStorage.clear()

                    store = App.__container__.lookup("controller:focusareas").store

                    theme = store.createRecord("theme",
                        id: 3
                        definition: 'theme definition'
                    )

                    focusarea = store.createRecord("focusarea",
                        id: 4
                        definition: 'focusarea definition'
                    )

                    theme.get("focusareas").then (focusareas) ->
                        focusareas.pushObject focusarea

                    expect(focusarea.get('definition')).to.equal('focusarea definition')

                    #theme.get('focusareas').then (focusareas)->
                    #    expect(focusareas.toArray.length).to.equal(1)



    #
    # Index
    #
    describe 'a focusareas page', ->
        beforeEach ->
            visit('/focusareas')

        it 'should have an add new focusarea button', ->
            findWithAssert('a.add-focusarea')

        it 'should direct to the new route when clicked', ->
            andThen ->
                click('a.add-focusarea')
                expect(currentURL()).to.equal('/focusareas/new')

        it 'should have table with a header and one columns', ->
            andThen ->
                findWithAssert('table.table')
                expect(find('table.table thead tr th').length).to.equal(1)

    #
    # NEW
    #
    describe 'a new focusarea page that', ->
        beforeEach ->
            visit("/focusareas")

        it 'should have a field and a submit button', ->
            andThen ->
                click('a.add-focusarea').then ->
                    findWithAssert('form')
                    findWithAssert('#definition')
                    findWithAssert("button.submit-button")

        it 'should create a new focusarea entry when submit gets clicked', ->
            andThen ->
                click('a.add-focusarea')
                fillIn('#definition', 'focusarea-definition1')
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
                .click('button.submit-button')
                .then ->
                    expect(find('table.table tbody tr').length).to.equal(2)

        it 'should have focusareas that each can be clicked to be edited', ->
            visit("/focusareas")
            andThen ->
                findWithAssert('td.focusarea-definition:contains("focusarea-definition2") a')


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
                        expect(find('table.table tbody tr').length).to.equal(1)