App.ColorPicker = Em.View.extend
    didInsertElement: ->
        $('#color').colorpicker();
