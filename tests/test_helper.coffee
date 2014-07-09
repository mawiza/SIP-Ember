#console debugging: App.__container__.lookup('store:main').find('org').then(function(stuff){console.log(stuff.toArray())});

before ->
    #Drop and select the test DB
    $.ajax
        async: false
        url: "http://localhost:4567/reset_db/sip_ember_test_db"
        success: (data) ->
            console.log "LOADED THE TEST DB", data

        error: (jqXHR, textStatus, errorThrown) ->
            console.log "ERROR LOADING THE TEST DB", jqXHR, textStatus, errorThrown
            request.abort()

    #Use our Sinatra server
    App.ApplicationAdapter = DS.RESTAdapter.extend
        namespace: 'api'
        host: 'http://127.0.0.1:4567'
        corsWithCredentials: true

    Ember.Test.adapter = Ember.Test.MochaAdapter.create()

    App.setupForTesting()
    App.injectTestHelpers()

    #Reduce the notify timeout to 1 ms otherwise this takes for ever to finish
    Ember.Notify.reopen
        timeout: 1

beforeEach ->
    Ember.run ->
        App.reset()
        return
    Ember.testing = true
    return

afterEach ->
    Ember.testing = false
    return

after ->
    #Reset and select the test DB
    $.ajax
        async: false
        url: "http://localhost:4567/select_db/sip_ember_db"
        success: (data) ->
            console.log "LOADED THE PROD DB" + data

        error: (jqXHR, textStatus, errorThrown) ->
            console.log "ERROR LOADING THE PROD DB", jqXHR, textStatus, errorThrown
            request.abort()

#
# Test to see if the navbar has the specified link and if it is functioning
#
Ember.Test.registerAsyncHelper "assertNavbarLink", (app, value) ->
    visit("/")
    andThen ->
        if value isnt ''
            $el = findWithAssert('.' + value + '-link')
        else
            $el = findWithAssert('.title-link')
        click($el)
        expect(currentURL()).to.equal('/' + value)
    return