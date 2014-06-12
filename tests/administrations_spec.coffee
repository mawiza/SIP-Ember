App.Administrations.FIXTURES = [
    {
        id: 1
        name: "OPB"
        color: "#000"
    }
    {
        id: 2
        name: "SSB"
        salary: "#fff"
    }
]

describe 'The administration page should', ->
    beforeEach ->
        visit("/administrations")

    describe 'contain a table', ->
            it 'with a header and two columns', ->
                andThen ->
                    findWithAssert('table.table')
                    expect(find('table.table thead tr th').length).to.equal(3)

            describe 'with a table body', ->
                it 'with rows of administrations', ->
                    andThen ->
                        expect(find('table.table tbody tr').length).to.equal(2)

                it 'the last columns of each row should contain RUD buttons', ->
                    expect(find('table.table tbody tr td button').length).to.equal(6)