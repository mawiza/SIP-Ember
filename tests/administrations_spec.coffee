describe 'The administrations page should', ->
    before ->
        #They do not get loaded???
        Ember.run ->
            App.Administration.FIXTURES = [
                {
                    id: 1
                    name: "OPB"
                    color: "#000"
                }
                {
                    id: 2
                    name: "SSB"
                    color: "#123"
                }
            ]

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
                    store = App.__container__.lookup("controller:administrations").store
                    administration = store.createRecord("administration",
                        id: 3
                        name: 'TOM'
                        color: '#ccc'
                    )
                    #administrations = store.all('administration')
                    expect(administration.get('name')).to.equal('TOM')

    #
    # NEW
    #
    describe 'should have an add new administrations button', ->
        beforeEach ->
            visit("/administrations")

        it 'should direct to the new route when clicked', ->
            andThen ->
                expect(findWithAssert('a.add-administration')).to.exist
                click('a.add-administration')
                expect(currentURL()).to.equal('/administrations/new')

        it 'should open a page to add a new administration', ->
            andThen ->
                click('a.add-administration')
                findWithAssert('form')
                findWithAssert('#name')
                findWithAssert('#color')
                findWithAssert("button:submit")

        it 'should create a new administrations entry when create gets clicked', ->
            andThen ->
                click('a.add-administration')
                fillIn('#name', 'OPB')
                .fillIn('#color', '#000')
                .click('button:submit')
                .then ->
                    expect(currentURL()).to.equal('/administrations')

    #
    # INDEX
    #
    describe 'have a table', ->

        it 'with a header and two columns', ->
            andThen ->
                visit("/administrations")
                findWithAssert('table.table')
                expect(find('table.table thead tr th').length).to.equal(2)

        describe 'with a table body', ->
            it 'that has rows of administrations', ->
                visit("/administrations/new")
                andThen ->
                    fillIn('#name', 'OPB')
                    .fillIn('#color', '#000')
                    .click('button:submit')
                    .then ->
                        expect(find('table.table tbody tr').length).to.equal(1)
