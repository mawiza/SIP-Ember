#expect = require('chai').expect

# Run before each test case.
beforeEach ->

    # Put the application into a known state, and destroy the defaultStore.
    # Be careful about DS.Model instances stored in App; they'll be invalid
    # after this.
    # This is broken in some versions of Ember and Ember Data, see:
    # https://github.com/emberjs/data/issues/847
    Ember.run ->
        App.reset()
        return


    # Display an error if asynchronous operations are queued outside of
    # Ember.run.  You need this if you want to stay sane.
    Ember.testing = true
    return


# Run after each test case.
afterEach ->
    Ember.testing = false
    return


# Optional: Clean up after our last test so you can try out the app
# in the jsFiddle.  This isn't normally required.
after ->
    Ember.run ->
        App.reset()
        return

    return

describe "Array", ->
    it "should return -1 when the value is not present", ->
        expect(true).to.equal(true)
    return