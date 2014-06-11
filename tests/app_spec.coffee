describe "The home page should display", ->
    beforeEach ->
        visit("/")

    it 'the app title and description elements', ->
        andThen ->
            findWithAssert('h2');
            findWithAssert('div.description');

    describe 'a navbar that has a', ->
        it 'a working title link', ->
            andThen ->
                $el = findWithAssert('.title-link')
                click($el)
                expect(currentURL()).to.equal('/')

        it 'a working administrations link', ->
            andThen ->
                $el = findWithAssert('.administrations-link')
                click($el)
                expect(currentURL()).to.equal('/administrations')

        it 'a working themes link', ->
            andThen ->
                $el = findWithAssert('.themes-link')
                click($el)
                expect(currentURL()).to.equal('/themes')

        it 'a working focus areas link', ->
            andThen ->
                $el = findWithAssert('.focusareas-link')
                click($el)
                expect(currentURL()).to.equal('/focusareas')

        it 'a working about link', ->
            andThen ->
                $el = findWithAssert('.about-link')
                click($el)
                expect(currentURL()).to.equal('/about')
