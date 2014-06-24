App.XNotifyComponent = Ember.Component.extend(
    classNames: "notify-messages"
    messages: Ember.computed.alias("notify")
)
App.XNotifyMessageComponent = Ember.Component.extend(
    classNames: ["x-notify-message-container"]
    classNameBindings: ["insertState"]
    insertState: "pre-insert"
    didInsertElement: ->
        self = this
        self.$().bind "webkitTransitionEnd", (event) ->
            self.notify.removeObject self.get("message")  if self.get("insertState") is "destroyed"
            return

        Ember.run.later (->
            self.set "insertState", "inserted"
            return
        ), 250

        if self.notify.timeout
            Ember.run.later (->
                self.set "insertState", "destroyed"
                return
            ), self.notify.timeout
        return

    # We need to clean this up, because notify gets called
    # again on page load, if we leave the page before
    # the timeout has had time to timeout
    willDestroyElement: ->
        self = this
        self.set "insertState", "destroyed"
        return

    click: ->
        self = this
        self.set "insertState", "destroyed"
        return
)