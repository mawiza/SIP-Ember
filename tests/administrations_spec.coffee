describe 'The administration page should', ->
    beforeEach ->
        visit("/administrations")

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
                #enter the values
                fillIn('#name', 'OPB')
                fillIn('#color', '#000')
                #click('button:submit')
                #expect(currentURL()).to.equal('/administrations')

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