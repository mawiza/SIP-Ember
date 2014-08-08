App.ApplicationRoute = Ember.Route.extend
    actions:
        loading: ->
            NProgress.start()
            @router.one('didTransition', ->
                setTimeout (-> NProgress.done()), 50
            )
            true
        error: ->
            setTimeout (-> NProgress.done()), 50