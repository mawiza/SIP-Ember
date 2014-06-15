describe 'The administration page should', ->
    beforeEach ->
        visit("/administrations")

    it 'have an add button', ->
        andThen ->
            expect(findWithAssert('a.add-administration')).to.exist
            click('a.add-administration')
            expect(currentURL()).to.equal('/administrations/new')
            #findWithAssert('form')
            fillIn('#name', 'OPB')
            fillIn('#color', '#000')
            #click('button.create')
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