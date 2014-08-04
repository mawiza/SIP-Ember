App.FocusareasController = Ember.ArrayController.extend()

#App.FocusareasController = Ember.ArrayController.extend
#    filteredFocusareas: (->
#        theme_id = @utility.idFromURL(window.location.href)
#        @get("model").filter (focusarea)->
#            if focusarea.get('data.theme.id') is theme_id
#                return true
#    ).property("focusarea.@each")