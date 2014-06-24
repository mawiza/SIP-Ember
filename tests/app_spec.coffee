describe "The home page should display", ->

    it 'the app title and description elements', ->
        visit("/")
        andThen ->
            findWithAssert('h2');
            findWithAssert('div.description');

    describe 'a navbar that has', ->
        it 'a working title link', ->
            assertNavbarLink('')

        it 'a working administrations link', ->
            assertNavbarLink('')

        it 'a working administrations link', ->
            assertNavbarLink('administrations')

        it 'a working themes link', ->
            assertNavbarLink('themes')

        it 'a working focus areas link', ->
            assertNavbarLink('focusareas')

        it 'a working about link', ->
            assertNavbarLink('about')
