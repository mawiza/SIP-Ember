describe 'Administrations should', ->

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
                    store = App.__container__.lookup('store:main')
                    administration = store.createRecord("administration",
                        id: 3
                        name: 'TOM'
                        color: '#ccc'
                    )
                    administration.save()
                    expect(administration.get('name')).to.equal('TOM')


    #
    # Index
    #
    describe 'an administration page that', ->
        beforeEach ->
            visit("/administrations")

        it 'should have an add new administration button', ->
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
        it 'should have fields and a submit button', ->
            visit("/administrations")
            andThen ->
                click('a.add-administration').then ->
                    findWithAssert('form')
                    findWithAssert('#name')
                    findWithAssert('#color')
                    findWithAssert("button.submit-button")
                    findWithAssert("button.cancel-button")

        it 'should be possible to cancel the update', ->
            visit("/administrations")
            andThen ->
                click('a.add-administration')
                .then ->
                   click('button.cancel-button')
                   .then ->
                      expect(currentURL()).to.equal('/administrations')

        it 'should create a new administrations entry when submit gets clicked', ->
            visit("/administrations")
            andThen ->
                click('a.add-administration')
                fillIn('#name', 'BOU')
                .fillIn('#color', '#000')
                .click('button.submit-button')
                .then ->
                    expect(currentURL()).to.equal('/administrations')

        it 'should be valid', ->
            visit("/administrations/new")
            andThen ->
                fillIn('#name', '')
                .fillIn('#color', '')
                .click('button.submit-button')
                .then ->
                    expect(currentURL()).to.equal('/administrations/new')

        it 'should transition to the the administrations page', ->
            visit("/administrations/new")
            andThen ->
                fillIn('#name', 'OPB')
                .fillIn('#color', '#000')
                .click('button.submit-button')
                .then ->
                    expect(find('table.table tbody tr').length).to.equal(5)

        it 'should have administrations that each can be clicked to be edited', ->
            visit("/administrations")
            andThen ->
                findWithAssert('td.administration-name:contains("OPB") a')

    #
    # Edit
    #
    describe 'an edit administration page that', ->
        beforeEach ->
            visit("/administrations")

        it 'should be accessed from the administrations page', ->
            andThen ->
                click('td.administration-name:contains("OPB") a')
                .then ->
                    findWithAssert('form')
                    findWithAssert('#name')
                    findWithAssert('#color')
                    findWithAssert("button.update-button")
                    findWithAssert("button.delete-button")

        it 'should be possible to update the record', ->
            andThen ->
                click('td.administration-name:contains("OPB") a')
                .then ->
                    fillIn('#color', '#123')
                    .click('button.update-button')
                    .then ->
                        expect(currentURL()).to.equal('/administrations')
                        findWithAssert('td.administration-color:contains("#123")')


        it 'should be possible to cancel the update', ->
            andThen ->
                click('td.administration-name:contains("OPB") a')
                .then ->
                    click('button.cancel-button')
                    .then ->
                        expect(currentURL()).to.equal('/administrations')


        it 'should be possible to delete the record', ->
            andThen ->
                click('td.administration-name:contains("OPB") a')
                .then ->
                    click('button.delete-button')
                    .then ->
                        expect(currentURL()).to.equal('/administrations')
                        expect(find('table.table tbody tr').length).to.equal(4)
