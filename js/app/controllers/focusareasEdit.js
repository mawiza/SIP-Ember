// Generated by CoffeeScript 1.7.1
(function() {
  App.FocusareasEditController = Ember.ObjectController.extend({
    actions: {
      update: function() {
        var focusarea, self, shouldSave, theme_id;
        focusarea = this.get('model');
        shouldSave = true;
        theme_id = this.utility.idFromURL(window.location.href);
        if (Ember.isEmpty(focusarea.get('definition'))) {
          this.notify.danger("Definition cannot be empty.");
          shouldSave = false;
        }
        if (theme_id == null) {
          this.notify.danger("You have to create themes before creating focus areas!");
          shouldSave = false;
        }
        if (shouldSave) {
          self = this;
          return this.store.find('theme', theme_id).then(function(theme) {
            focusarea.set('theme', theme);
            return focusarea.save().then(function() {
              return self.transitionToRoute('/themes/' + theme_id + '/focusareas');
            });
          });
        } else {
          return this.transitionToRoute('/themes/' + theme_id + '/focusareas/edit');
        }
      },
      "delete": function() {
        var administration, self;
        self = this;
        administration = this.get('model');
        return administration.destroyRecord().then(function() {
          return self.transitionToRoute('/themes/' + self.utility.idFromURL(window.location.href) + '/focusareas');
        });
      },
      cancel: function() {
        this.get('model').rollback();
        return this.transitionToRoute('/themes/' + this.utility.idFromURL(window.location.href) + '/focusareas');
      }
    }
  });

}).call(this);

//# sourceMappingURL=focusareasEdit.map
