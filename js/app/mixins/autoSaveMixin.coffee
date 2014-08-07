# Debounced autosave for Ember.js
# Original code by Mitch Lloyd http://gaslight.co/blog/?author=mitchlloyd
# updated from http://gaslight.co/blog/an-autosave-pattern-for-ember-and-ember-data
# repo at https://github.com/gaslight/ember-autosaving
# Changed to work with latest Ember Data as of 2013-12-16 by Genkilabs
# Includes hooks for pacifier from http://ricostacruz.com/nprogress
# NOTE: This requires a 2 part install in which the controller and any models it loads have the corresponding mixin

# This is how long we will wait on a form before saving. I like to put this in App.AUTOSAVE_DELAY
AUTOSAVE_DELAY = 1500

# Model Component
App.AutosavableModel = Ember.Mixin.create(_buffers: (->
    Ember.Map.create()
).property())

# Controller Component
App.AutosavableController = Ember.Mixin.create(
    bufferedFields: []
    instaSaveFields: []

    # Convenience property to access all the fields together
    _allFields: (->
        @get("bufferedFields").concat @get("instaSaveFields")
    ).property()

    # # If we update a field that has been specified as one of the
    # # bufferedFields or instaSaveFields write these to a buffer
    # # instead of the actual attribute and save.
    setUnknownProperty: (key, value) ->
        if @get('ready')
            if @get("bufferedFields").contains(key)
                @get("_buffers").set key, value
                @_debouncedSave()
            else if @get("instaSaveFields").contains(key)
                @_super key, value
                @_save()
            else
                @_super key, value


    # Pull properties from the buffer if they have been set there.
    # This is like the getter for our buffer or the model
    unknownProperty: (key) ->
        if @get('ready')
            if @get("_allFields").contains(key) and @get("_buffers").get(key)
                @get("_buffers").get key
            else
                @_super key


    _save: ->
        if @get('ready')
            _this = this
            object = @get("content")
            unless @get("content.isSaving")
                console.log "App.AutosavableController::_save: Saving Changes..."

                #Start pacifier
                NProgress.set(0).start()

                #any buffered changes we have made get rolled into this save
                @get("_buffers").forEach (key, value) ->
                    _this.get("content").set key, value

                #now clear out our buffer.
                @set "_buffers", Ember.Map.create()

                # Callback method and Observers to stop pacifier
                progressDone = (object) ->
                    NProgress.done()
                    return

                object.on "didCreate", progressDone
                object.on "didUpdate", progressDone
                object.save()
            else
                @_debouncedSave()

    _debouncedSave: (immediate) ->
        if @get('ready')
            console.log "App.AutosavableController::_debouncedSave: Save requestsed and scheduled: ", AUTOSAVE_DELAY
            Ember.run.debounce this, @_save, AUTOSAVE_DELAY, immediate
            return


    # When the model is about to change out from under the controller we must
    # immediately save any pending changes and clear out the _buffers.

    # FOR NOW, call immediate save because there is some bug in the immediate argument of Ember.run.debounce

    _saveNowAndClear: (->
        if @get('ready')
            console.log "App.AutosavableController::_saveNowAndClear: clearing..."
            return  if not @get("content") or @get("content.isDeleted")
            @_save() #@._debouncedSave(true)
            @set "_buffers", Ember.Map.create()
    ).observesBefore("content")

    # ACTIONS kick off decorated methods from our views
    actions:
        save: ->
            # FOR NOW, call immediate save because there is some bug in the immediate argument of Ember.run.debounce
            @_save() #@._debouncedSave(true)
            return
)
