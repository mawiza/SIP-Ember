describe 'The administration page should', ->
    beforeEach ->
        visit("/administrations")

    describe 'should have an add new administrations button', ->
        it 'should direct to the new route when clicked', ->
            andThen ->
                expect(findWithAssert('a.add-administration')).to.exist
                click('a.add-administration')
                expect(currentURL()).to.equal('/administrations/new')

        it 'should open a modal dialog when clicked', ->
            andThen ->
                click('a.add-administration')
                expect(findWithAssert('div.modal').css("display")).to.not.equal('none')
                findWithAssert('form')
                fillIn('#name', 'OPB')
                fillIn('#color', '#000')

        it 'should create a new administrations entry when create gets clicked', ->
            andThen ->
                click('a.add-administration')
                #enter the values
                findWithAssert("button:contains('Submit')")
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