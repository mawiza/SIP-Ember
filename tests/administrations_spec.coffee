describe 'Administrations should', ->
    before ->
        #They do not get loaded???
        Ember.run ->
            App.Administration.FIXTURES = [
                {
                    id: 1
                    name: "SSB"
                    color: "#000"
                }
                {
                    id: 2
                    name: "BEK"
                    color: "#123"
                }
            ]

        #Reduce the notify timeout to 0.5 seconds otherwise this takes for ever to finish
        Ember.Notify.reopen
            timeout: 500

    #
    # Model
    #
    describe 'have a model that', ->
        it 'should have a name property', ->
            nameProperty = App.Administration.metaForProperty('name')
            expect(nameProperty.type).to.equal('string')

        it 'should have a color property', ->
            colorProperty = App.Administration.metaForProperty('color')
            expect(colorProperty.type).to.equal('string')

        it 'can be created', ->
            visit("/administrations")
            andThen ->
                Ember.run ->
                    localStorage.clear()
                    store = App.__container__.lookup("controller:administrations").store
                    administration = store.createRecord("administration",
                        id: 3
                        name: 'TOM'
                        color: '#ccc'
                    )
                    #administrations = store.all('administration')
                    expect(administration.get('name')).to.equal('TOM')


    #
    # Index
    #
    describe 'an administration page that', ->
        beforeEach ->
            visit("/administrations")

        it 'have an add new administration button', ->
            findWithAssert('a.add-administration')

        it 'should direct to the new route when clicked', ->
            andThen ->
                click('a.add-administration')
                expect(currentURL()).to.equal('/administrations/new')

        it 'should have table with a header and two columns', ->
            andThen ->
                findWithAssert('table.table')
                expect(find('table.table thead tr th').length).to.equal(2)


    #
    # NEW
    #
    describe 'a new administration page that', ->
        beforeEach ->
            visit("/administrations")

        it 'should have fields and a submit button', ->
            andThen ->
                click('a.add-administration').then ->
                    findWithAssert('form')
                    findWithAssert('#name')
                    findWithAssert('#color')
                    findWithAssert("button:submit")

        it 'should create a new administrations entry when submit gets clicked', ->
            andThen ->
                click('a.add-administration')
                fillIn('#name', 'SSB')
                .fillIn('#color', '#000')
                .click('button:submit')
                .then ->
                    expect(currentURL()).to.equal('/administrations')

        it 'should be valid', ->
            visit("/administrations/new")
            andThen ->
                fillIn('#name', '')
                .fillIn('#color', '')
                .click('button:submit')
                .then ->
                    expect(currentURL()).to.equal('/administrations/new')

        it 'should transition to the the administrations page', ->
            visit("/administrations/new")
            andThen ->
                fillIn('#name', 'OPB')
                .fillIn('#color', '#000')
                .click('button:submit')
                .then ->
                    expect(find('table.table tbody tr').length).to.equal(2)

        it 'should have administrations that each can be clicked to be edited', ->
            visit("/administrations")
            andThen ->
                findWithAssert('td.administration-name:contains("OPB") a')

    #
    # Edit
    #
    describe 'an edit administration page that', ->
        it 'should be accessed from the administrations page', ->
            visit("/administrations")
            andThen ->
                click('td.administration-name:contains("OPB") a')
                .then ->
                    findWithAssert('form')
                    findWithAssert('#name')
                    findWithAssert('#color')
                    findWithAssert("button.update-button")
                    findWithAssert("button.delete-button")

        it 'should be possible to update the record', ->
            visit("/administrations")
            andThen ->
                click('td.administration-name:contains("OPB") a')
                .then ->
                    fillIn('#color', '#123')
                    .click('button.update-button')
                    .then ->
                        expect(currentURL()).to.equal('/administrations')
                        # This might be a little bit thin, but at the
                        # moment I know that I'm the only that has entered the value #123
                        findWithAssert('td.administration-color:contains("#123")')


        it 'should be possible to delete the record', ->
            visit('/administrations')
            andThen ->
                click('td.administration-name:contains("OPB") a')
                .then ->
                    click('button.delete-button')
                    .then ->
                        expect(currentURL()).to.equal('/administrations')
                        expect(find('table.table tbody tr').length).to.equal(1)


