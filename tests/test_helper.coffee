#console debugging: App.__container__.lookup('store:main').find('org').then(function(stuff){console.log(stuff.toArray())});

before ->
    App.ApplicationAdapter = DS.FixtureAdapter
        simulateRemoteResponse: false

    App.ApplicationStore = DS.Store.extend
        adapter:DS.FixtureAdapter

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