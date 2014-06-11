before ->
    Ember.Test.adapter = Ember.Test.MochaAdapter.create(null)
    App.setupForTesting()
    App.injectTestHelpers()

beforeEach ->
    Ember.run ->
        App.reset()
        return
    Ember.testing = true
    return

afterEach ->
    Ember.testing = false
    return