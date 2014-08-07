App.ThemesIndexRoute = Ember.Route.extend
    model: (params)->
        App.log('Loading the model for theme', 'App.ThemesIndexRoute.model', params)
        @store.find('theme')

    afterModel: (themes, transition) ->
        if themes.get('length') != 0
            theme_id = @utility.idFromURL(window.location.href)
            try
                if theme_id?
                    @transitionTo "/themes/" + theme_id + "/focusareas"
                else
                    @transitionTo "/themes/" + themes.get("firstObject").get('id') + "/focusareas"
            catch error
                @transitionTo "/themes/" + themes.get("firstObject").get('id') + "/focusareas"
        else
            @transitionTo "/themes/new"

App.ThemesRoute = Ember.Route.extend
    model: ->
        App.log('Loading the model for theme', 'App.ThemesRoute.model')
        @store.find('theme')

    afterModel: (themes, transition) ->
        console.log "AFTER MODEL - ThemesRoute", window.location.href
        theme_id = @utility.idFromURL(window.location.href)
        if theme_id?
            @transitionTo "/themes/" + theme_id + "/focusareas"
        else if themes.get("firstObject")?
            @transitionTo "/themes/" + themes.get("firstObject").get('id') + "/focusareas"
        else
            @transitionTo "/themes/new"

App.ThemesNewRoute = Ember.Route.extend
    model: ->
        App.log('Loading the model for theme', 'App.ThemesNewRoute.model');
        @store.createRecord('theme')

App.ThemesEditRoute = Ember.Route.extend
    model: (params) ->
        App.log('Loading the model for theme', 'App.ThemesEditRoute.model', params)
        @modelFor('theme', params)

    setupController: (controller, model) ->
        @_super(controller, model)
        focusareas = @store.find('focusarea', {theme: model.id})
        focusareas.then ->
            App.log('Setting up the controller for edit theme', 'App.ThemesEditRoute.setupController', focusareas)
            controller.set('focusareasLength', focusareas.get('length'))
