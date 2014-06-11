describe 'The administration page', ->
    beforeEach ->
        visit("/administrations")

    it 'should display a list of administrations', ->
