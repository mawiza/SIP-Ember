#App.FocusareasController = Ember.ArrayController.extend
#    filteredFocusareas: (->
#        self = this
#        theme_id = @utility.themeId(window.location.href)
#        @get("store").filter "focusarea", {theme: theme_id}, (focusarea)->
#            console.log focusarea
#            focusarea.get("theme").then (theme) ->
#                console.log theme_id, "=>", theme.get("id"), " found -> ", theme.get("id") is theme_id
#                if theme.get("id") is theme_id
#                    return true
#    ).property("focusareas.@each")