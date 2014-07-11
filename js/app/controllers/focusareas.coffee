#App.FocusareasController = Ember.ArrayController.extend

#
#    filteredFocusareas: (->
#        App.log('Getting the theme id', 'App.FocusareasController.filteredFocusareas', @get('theme_id'))
#        @get("model").filterProperty "theme", @get('theme_id')
#    ).property("model.@each.theme")

#    focusareas: (->
#        self = this
#        @get("store").filter "focusarea", (focusarea) ->
#            console.log "#################---", focusarea.get("theme").get('content.id')
#            focusarea.get("theme.id") is self.get('theme_id')
#        ).property("focusareas")