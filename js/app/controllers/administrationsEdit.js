// Generated by CoffeeScript 1.7.1
(function() {
  App.AdministrationsEditController = Ember.ObjectController.extend({
    actions: {
      update: function() {
        var administration, count, self, shouldSave;
        administration = this.get('model');
        shouldSave = true;
        if (Ember.isEmpty(administration.get('name'))) {
          this.notify.danger("Name cannot be empty.");
          shouldSave = false;
        }
        count = 0;
        this.store.all('administration').forEach(function(record) {
          if (record.get('name') === administration.get('name')) {
            return count += 1;
          }
        });
        if (count > 1) {
          this.notify.danger(administration.get('name') + " is already used.");
          shouldSave = false;
        }
        if (Ember.isEmpty(administration.get('color'))) {
          this.notify.danger("Color cannot be empty.");
          shouldSave = false;
        }
        if (shouldSave) {
          self = this;
          return administration.save().then(function() {
            return self.transitionToRoute('/administrations');
          });
        }
      },
      "delete": function() {
        var administration, self;
        self = this;
        administration = this.get('model');
        console.log('delete administration');
        return administration.destroyRecord().then(function() {
          return self.transitionToRoute('/administrations');
        });
      },
      cancel: function() {
        return this.transitionToRoute('/administrations');
      }
    }
  });

}).call(this);

//# sourceMappingURL=administrationsEdit.map
