describe 'Themes should', ->
    before ->
        Ember.run ->
            App.Theme.FIXTURES = [
                {
                    id: 1
                    content: "theme1"
                    focusareas: [1,2]
                }
                {
                    id: 2
                    content: "theme2"
                    focusareas: [3,4]
                }
            ]

            App.Focusarea.FIXTURES = [
                {
                    id: 1
                    content: "focusarea1"
                    theme: 1
                }
                {
                    id: 2
                    content: "focusarea2"
                    theme: 1
                }
                {
                    id: 3
                    content: "focusarea3"
                    theme: 2
                }
                {
                    id: 4
                    content: "focusarea4"
                    theme: 2
                }
            ]

    describe 'should have a model that', ->
        it 'should have a content property', ->
            contentProperty = App.Theme.metaForProperty('content')
            expect(contentProperty.type).to.equal('string')

        it 'should have a focusareas property', ->
            contentProperty = App.Theme.metaForProperty('focusareas')
            expect(contentProperty.type).to.equal('focusarea')

        it 'can be created', ->
            visit("/themes")
            andThen ->
                Ember.run ->
                    localStorage.clear()
                    store = App.__container__.lookup("controller:themes").store
                    theme = store.createRecord("theme",
                        id: 3
                        content: 'theme content'
                    )
                    expect(theme.get('content')).to.equal('theme content')

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

        it 'should have table with a header and one columns', ->
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
                    findWithAssert('#content')
                    findWithAssert("button:submit")

        it 'should create a new theme entry when submit gets clicked', ->
            andThen ->
                click('a.add-theme')
                fillIn('#content', 'theme-content1')
                .click('button:submit')
                .then ->
                    expect(currentURL()).to.equal('/themes')

        it 'should be valid', ->
            visit("/themes/new")
            andThen ->
                fillIn('#content', '')
                .click('button:submit')
                .then ->
                    expect(currentURL()).to.equal('/themes/new')

        it 'should transition to the the themes page', ->
            visit("/themes/new")
            andThen ->
                fillIn('#content', 'theme-content2')
                .click('button:submit')
                .then ->
                    expect(find('table.table tbody tr').length).to.equal(2)

        it 'should have themes that each can be clicked to be edited', ->
            visit("/themes")
            andThen ->
                findWithAssert('td.theme-content:contains("theme-content1") a')