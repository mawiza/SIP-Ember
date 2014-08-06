// Generated by CoffeeScript 1.7.1
(function() {
  var AUTOSAVE_DELAY;

  AUTOSAVE_DELAY = 1500;

  App.AutosavableModel = Ember.Mixin.create({
    _buffers: (function() {
      return Ember.Map.create();
    }).property()
  });

  App.AutosavableController = Ember.Mixin.create({
    bufferedFields: [],
    instaSaveFields: [],
    ready: false,
    _allFields: (function() {
      return this.get("bufferedFields").concat(this.get("instaSaveFields"));
    }).property(),
    setUnknownProperty: function(key, value) {
      console.log("setUnknownProperty called!!");
      if (this.get("bufferedFields").contains(key)) {
        this.get("_buffers").set(key, value);
        return this._debouncedSave();
      } else if (this.get("instaSaveFields").contains(key)) {
        this._super(key, value);
        return this._save();
      } else {
        return this._super(key, value);
      }
    },
    unknownProperty: function(key) {
      console.log("unknownProperty called!!");
      if (this.get("_allFields").contains(key) && this.get("_buffers").get(key)) {
        return this.get("_buffers").get(key);
      } else {
        return this._super(key);
      }
    },
    _save: function() {
      var object, progressDone, _this;
      console.log("_save called!!");
      _this = this;
      object = this.get("content");
      if (!this.get("content.isSaving")) {
        console.log("App.AutosavableController::_save: Saving Changes...");
        NProgress.set(0).start();
        this.get("_buffers").forEach(function(key, value) {
          return _this.get("content").set(key, value);
        });
        this.set("_buffers", Ember.Map.create());
        progressDone = function(object) {
          NProgress.done();
        };
        object.on("didCreate", progressDone);
        object.on("didUpdate", progressDone);
        return object.save();
      } else {
        return this._debouncedSave();
      }
    },
    _debouncedSave: function(immediate) {
      console.log("App.AutosavableController::_debouncedSave: Save requestsed and scheduled: ", AUTOSAVE_DELAY);
      Ember.run.debounce(this, this._save, AUTOSAVE_DELAY, immediate);
    },
    _saveNowAndClear: (function() {
      console.log("App.AutosavableController::_saveNowAndClear: clearing...");
      if (!this.get("content") || this.get("content.isDeleted")) {
        return;
      }
      this._save();
      return this.set("_buffers", Ember.Map.create());
    }).observesBefore("content"),
    actions: {
      save: function() {
        this._save();
      }
    }
  });

}).call(this);

//# sourceMappingURL=autoSaveMixin.map
