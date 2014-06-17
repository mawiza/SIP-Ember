describe 'The administrations page should', ->
    beforeEach ->
        visit("/administrations")

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
            Ember.run ->
                store = App.__container__.lookup("controller:administrations").store
                administration = store.createRecord("administration",
                    id: 1
                    name: 'TOM'
                    color: '#ccc'
                )
                administrations = store.all('administration')
                expect(administrations.toArray().length).to.equal(1)

    #
    # NEW
    #
    describe 'should have an add new administrations button', ->
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
                fillIn('#color', '#000')
                click('button:submit')
                expect(currentURL()).to.equal('/administrations')

    #
    # INDEX
    #
    describe 'have a table', ->
            it 'with a header and two columns', ->
                andThen ->
                    findWithAssert('table.table')
                    expect(find('table.table thead tr th').length).to.equal(2)

#            describe 'with a table body', ->
#                it 'with rows of administrations', ->
#                    andThen ->
#                        expect(find('table.table tbody tr').length).to.equal(2)
#
#                it 'the last columns of each row should contain RUD buttons', ->
#                    expect(find('table.table tbody tr td button').length).to.equal(6)