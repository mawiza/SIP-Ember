// Generated by CoffeeScript 1.7.1
(function() {
  App.ThemesNewController = Ember.ObjectController.extend({
    actions: {
      submit: function() {
        var shouldSave, theme;
        theme = this.get('model');
        shouldSave = true;
        if (Ember.isEmpty(theme.get('definition'))) {
          this.notify.danger("Definition cannot be empty.");
          shouldSave = false;
        }
        if (shouldSave) {
          theme.save();
          return this.transitionToRoute('/themes');
        } else {
          return this.transitionToRoute('/themes/new');
        }
      }
    }
  });

}).call(this);

//# sourceMappingURL=themesNew.map
