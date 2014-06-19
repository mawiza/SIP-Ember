// Generated by CoffeeScript 1.7.1
(function() {
  App.AdministrationsNewController = Ember.ObjectController.extend({
    actions: {
      submit: function() {
        var administration, count, shouldRedirect;
        administration = this.get('model');
        shouldRedirect = true;
        if (Ember.isEmpty(administration.get('name'))) {
          this.notify.danger("Name cannot be empty.");
          shouldRedirect = false;
        }
        count = 0;
        this.store.all('administration').forEach(function(record) {
          if (record.get('name') === administration.get('name')) {
            return count += 1;
          }
        });
        if (count > 1) {
          this.notify.danger(administration.get('name') + " is already used.");
          shouldRedirect = false;
        }
        if (Ember.isEmpty(administration.get('color'))) {
          this.notify.danger("Color cannot be empty.");
          shouldRedirect = false;
        }
        if (shouldRedirect) {
          administration.save();
          return this.transitionToRoute('/administrations');
        } else {

        }
      }
    }
  });

}).call(this);

//# sourceMappingURL=administrationsNew.map
