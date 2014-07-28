App.ColorPicker = Ember.View.extend
    didInsertElement: ->
        $('#color').colorpicker();
