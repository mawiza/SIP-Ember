App.FocusareasController = Ember.ArrayController.extend()

#App.FocusareasController = Ember.ArrayController.extend
#    filteredFocusareas: (->
#        theme_id = @utility.idFromURL(window.location.href)
#        @get("model").filter (focusarea)->
#            console.log theme_id, "=>", focusarea.get('data.theme.id'), " found -> ", focusarea.get('data.theme.id') is theme_id
#            if focusarea.get('data.theme.id') is theme_id
#                return true
#    ).property("focusarea.@each")