describe "The home page should display", ->

    it 'the app title and description elements', ->
        visit("/")
        andThen ->
            findWithAssert('h2');
            findWithAssert('div.description');

    describe 'a navbar that has', ->
        it 'a working title link', ->
            assertNavbarLink('')

        it 'a working strategies link', ->
            assertNavbarLink('strategies')

        it 'a working administrations link', ->
            assertNavbarLink('administrations')

        it 'a working themes link', ->
            assertNavbarLink('themes')
