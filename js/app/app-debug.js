(function() {
    Ember.Notify = Ember.ArrayProxy.extend({
        content: Ember.A(),
        timeout: 5e3,
        pushObject: function(object) {
            object.typeClass = "alert-" + object.type;
            this._super(object);
        },
        danger: function(message) {
            console.log("Notify: " + message);
            this.pushObject({
                type: "danger",
                message: message
            });
        },
        warning: function(message) {
            console.log("Notify: " + message);
            this.pushObject({
                type: "warning",
                message: message
            });
        },
        info: function(message) {
            console.log("Notify: " + message);
            this.pushObject({
                type: "info",
                message: message
            });
        },
        success: function(message) {
            console.log("Notify: " + message);
            this.pushObject({
                type: "success",
                message: message
            });
        }
    });
    Ember.Application.initializer({
        name: "registerNotifyMessages",
        initialize: function(container, application) {
            application.register("notify:main", Ember.Notify);
        }
    });
    Ember.Application.initializer({
        name: "injectNotifyMessages",
        initialize: function(container, application) {
            application.inject("controller", "notify", "notify:main");
            application.inject("component", "notify", "notify:main");
            application.inject("route", "notify", "notify:main");
        }
    });
}).call(this);

(function() {
    Ember.Utility = Ember.Object.extend({
        updateOrSave: function(controller, administration) {
            var count, shouldSave;
            shouldSave = true;
            if (Ember.isEmpty(administration.get("name"))) {
                controller.notify.danger("Name cannot be empty.");
                shouldSave = false;
            }
            count = 0;
            controller.store.all("administration").forEach(function(record) {
                if (record.get("name") === administration.get("name")) {
                    return count += 1;
                }
            });
            if (count > 1) {
                controller.notify.danger(administration.get("name") + " is already used.");
                shouldSave = false;
            }
            if (Ember.isEmpty(administration.get("color"))) {
                controller.notify.danger("Color cannot be empty.");
                shouldSave = false;
            }
            if (shouldSave) {
                return administration.save().then(function() {
                    return controller.transitionToRoute("/administrations");
                });
            } else {
                return controller.transitionToRoute("/administrations/new");
            }
        }
    });
    Ember.Application.initializer({
        name: "registerUtilities",
        initialize: function(container, application) {
            application.register("utility:main", Ember.Utility);
        }
    });
    Ember.Application.initializer({
        name: "injectUtilities",
        initialize: function(container, application) {
            application.inject("controller", "utility", "utility:main");
        }
    });
}).call(this);

(function() {
    Ember.I18n.translations = {
        application: {
            title: "Strategiske Indsatsplan",
            navbar: {
                index: "Oversigt",
                edit: "Redigere SIP",
                administrations: "Forvaltninger",
                themes: "Temaer",
                focusareas: "Fokus Område",
                settings: "Indstillinger",
                about: "Om"
            },
            footer: {
                organization: "Herning Kommune"
            }
        },
        index: {
            heading: "Oversigt",
            description: ""
        },
        administrations: {
            index: {
                add: "Tilføj forvaltning",
                name: "Forvaltning",
                color: "Farve"
            },
            "new": {
                heading: "Opret nye forvaltning",
                name: "Navn",
                color: "Farve",
                create: "Opret"
            },
            edit: {
                heading: "Redigere forvaltningen",
                name: "Navn",
                color: "Farve",
                update: "Opdatere",
                "delete": "Slet",
                cancel: "Annullere",
                modal: {
                    info: "Er du sikker at du vil gerne slette {{name}}"
                }
            }
        },
        themes: {
            index: {
                add: "Tilføj tema",
                definition: "Beskrivelse"
            },
            "new": {
                heading: "Opret nye tema",
                definition: "Beksrivelse",
                create: "Opret"
            },
            edit: {
                heading: "Redigere tema",
                name: "Beskrivelse",
                update: "Opdatere",
                "delete": "Slet",
                cancel: "Annullere",
                modal: {
                    info: "Er du sikker at du vil gerne slette {{definition}}"
                }
            }
        },
        focusareas: {
            index: {
                add: "Tilføj fokus område",
                definition: "Beskrivelse",
                theme: "Tema"
            },
            "new": {
                heading: "Opret nye fokus område",
                definition: "Beksrivelse",
                create: "Opret"
            },
            edit: {
                heading: "Redigere fokus område",
                name: "Beskrivelse",
                update: "Opdatere",
                "delete": "Slet",
                cancel: "Annullere",
                modal: {
                    info: "Er du sikker at du vil gerne slette {{definition}}"
                }
            }
        },
        notify: {
            danger: "Fejl",
            warning: "Bemærk",
            info: "Info",
            success: "Success"
        }
    };
}).call(this);

(function() {
    Ember.Handlebars.helper("capitalize", function(value) {
        if (Ember.I18n.exists("notify." + value)) {
            return Ember.I18n.t("notify." + value);
        } else {
            return value.capitalize();
        }
    });
    window.App = Ember.Application.create();
    App.ApplicationAdapter = DS.LSAdapter.extend({
        namespace: "sip"
    });
    DS.LSAdapter.create({
        namespace: "sip"
    });
}).call(this);

(function() {
    App.XNotifyComponent = Ember.Component.extend({
        classNames: "notify-messages",
        messages: Ember.computed.alias("notify")
    });
    App.XNotifyMessageComponent = Ember.Component.extend({
        classNames: [ "x-notify-message-container" ],
        classNameBindings: [ "insertState" ],
        insertState: "pre-insert",
        didInsertElement: function() {
            var self;
            self = this;
            self.$().bind("webkitTransitionEnd", function(event) {
                if (self.get("insertState") === "destroyed") {
                    self.notify.removeObject(self.get("message"));
                }
            });
            Ember.run.later(function() {
                self.set("insertState", "inserted");
            }, 250);
            if (self.notify.timeout) {
                Ember.run.later(function() {
                    self.set("insertState", "destroyed");
                }, self.notify.timeout);
            }
        },
        willDestroyElement: function() {
            var self;
            self = this;
            self.set("insertState", "destroyed");
        },
        click: function() {
            var self;
            self = this;
            self.set("insertState", "destroyed");
        }
    });
}).call(this);

(function() {
    App.ColorPicker = Em.View.extend({
        didInsertElement: function() {
            return $("#color").colorpicker();
        }
    });
}).call(this);

(function() {
    App.Administration = DS.Model.extend({
        name: DS.attr("string"),
        color: DS.attr("string"),
        style: function() {
            return "background-color:" + this.get("color");
        }.property("color")
    });
}).call(this);

(function() {
    App.Theme = DS.Model.extend({
        definition: DS.attr("string"),
        focusareas: DS.hasMany("focusarea", {
            async: true
        })
    });
}).call(this);

(function() {
    App.Focusarea = DS.Model.extend({
        definition: DS.attr("string"),
        theme: DS.belongsTo("theme", {
            async: true
        })
    });
}).call(this);

(function() {
    App.Router.map(function() {
        this.resource("administrations");
        this.resource("administrations.new", {
            path: "/administrations/new"
        });
        this.resource("administrations.edit", {
            path: "/administrations/edit/:id"
        });
        this.resource("themes");
        this.resource("themes.new", {
            path: "/themes/new"
        });
        this.resource("themes.edit", {
            path: "/themes/edit/:id"
        });
        this.resource("focusareas");
        this.resource("focusareas.new", {
            path: "/focusareas/new"
        });
        this.resource("focusareas.edit", {
            path: "/focusareas/edit/:id"
        });
        this.resource("about");
        return this.resource("settings");
    });
}).call(this);

(function() {
    App.AdministrationsRoute = Ember.Route.extend({
        model: function() {
            return this.store.find("administration");
        }
    });
    App.AdministrationsNewRoute = Ember.Route.extend({
        model: function() {
            return this.store.createRecord("administration");
        }
    });
    App.AdministrationsEditRoute = Ember.Route.extend({
        model: function() {
            return this.modelFor("administration");
        }
    });
}).call(this);

(function() {
    App.ThemesRoute = Ember.Route.extend({
        model: function() {
            this.store.all("theme").forEach(function(model) {
                if (model && model.get("isDirty")) {
                    return model.rollback();
                }
            });
            return this.store.find("theme");
        }
    });
    App.ThemesNewRoute = Ember.Route.extend({
        model: function() {
            return this.store.createRecord("theme");
        }
    });
    App.ThemesEditRoute = Ember.Route.extend({
        model: function(params) {
            return this.modelFor("theme", params);
        }
    });
}).call(this);

(function() {
    App.FocusareasRoute = Ember.Route.extend({
        model: function() {
            this.store.all("focusarea").forEach(function(model) {
                if (model && model.get("isDirty")) {
                    return model.rollback();
                }
            });
            return this.store.find("focusarea");
        }
    });
    App.FocusareasNewRoute = Ember.Route.extend({
        model: function() {
            return this.store.createRecord("focusarea");
        },
        setupController: function(controller, model) {
            this._super(controller, model);
            controller.set("availableThemes", this.store.find("theme"));
            return controller.set("selectedTheme", this.store.find("theme")[0]);
        }
    });
    App.FocusareasEditRoute = Ember.Route.extend({
        model: function() {
            return this.modelFor("focusarea");
        },
        setupController: function(controller, model) {
            this._super(controller, model);
            controller.set("availableThemes", this.store.find("theme"));
            return model.get("theme").then(function(theme) {
                return controller.set("selectedTheme", theme.get("id"));
            });
        }
    });
}).call(this);

(function() {
    App.AdministrationsController = Ember.ArrayController.extend({
        administrationsCount: function() {
            var length;
            length = this.get("model.length");
            if (!length) {
                return 0;
            } else {
                return length;
            }
        }.property("@each")
    });
}).call(this);

(function() {
    App.AdministrationsNewController = Ember.ObjectController.extend({
        actions: {
            submit: function() {
                var administration;
                administration = this.get("model");
                return this.utility.updateOrSave(this, administration);
            },
            cancel: function() {
                return this.transitionToRoute("/administrations");
            }
        }
    });
}).call(this);

(function() {
    App.AdministrationsEditController = Ember.ObjectController.extend({
        actions: {
            update: function() {
                var administration;
                administration = this.get("model");
                return this.utility.updateOrSave(this, administration);
            },
            "delete": function() {
                var administration;
                administration = this.get("model");
                administration.destroyRecord();
                return this.transitionToRoute("/administrations");
            },
            cancel: function() {
                return this.transitionToRoute("/administrations");
            }
        }
    });
}).call(this);

(function() {
    App.ThemesController = Ember.ArrayController.extend();
}).call(this);

(function() {
    App.ThemesNewController = Ember.ObjectController.extend({
        actions: {
            submit: function() {
                var shouldSave, theme;
                theme = this.get("model");
                shouldSave = true;
                if (Ember.isEmpty(theme.get("definition"))) {
                    this.notify.danger("Definition cannot be empty.");
                    shouldSave = false;
                }
                if (shouldSave) {
                    theme.save();
                    return this.transitionToRoute("/themes");
                } else {
                    return this.transitionToRoute("/themes/new");
                }
            },
            cancel: function() {
                return this.transitionToRoute("/themes");
            }
        }
    });
}).call(this);

(function() {
    App.ThemesEditController = Ember.ObjectController.extend({
        actions: {
            update: function() {
                var shouldSave, theme;
                theme = this.get("model");
                shouldSave = true;
                if (Ember.isEmpty(theme.get("definition"))) {
                    this.notify.danger("Definition cannot be empty.");
                    shouldSave = false;
                }
                if (shouldSave) {
                    theme.save();
                    return this.transitionToRoute("/themes");
                } else {
                    return this.transitionToRoute("/themes/edit");
                }
            },
            "delete": function() {
                var administration;
                administration = this.get("model");
                administration.destroyRecord();
                return this.transitionToRoute("/themes");
            },
            cancel: function() {
                return this.transitionToRoute("/themes");
            }
        }
    });
}).call(this);

(function() {
    App.FocusareasController = Ember.ArrayController.extend();
}).call(this);

(function() {
    App.FocusareasNewController = Ember.ObjectController.extend({
        actions: {
            submit: function() {
                var focusarea, shouldSave, themeId;
                focusarea = this.get("model");
                shouldSave = true;
                themeId = this.get("selectedTheme");
                if (Ember.isEmpty(focusarea.get("definition"))) {
                    this.notify.danger("Definition cannot be empty.");
                    shouldSave = false;
                }
                if (themeId == null) {
                    this.notify.danger("You have to create themes before creating focus areas!");
                    shouldSave = false;
                }
                if (shouldSave) {
                    this.store.find("theme", themeId).then(function(theme) {
                        return theme.get("focusareas").then(function(focusareas) {
                            focusareas.pushObject(focusarea);
                            theme.save();
                            return focusarea.save();
                        });
                    });
                    return this.transitionToRoute("/focusareas");
                } else {
                    return this.transitionToRoute("/focusareas/new");
                }
            },
            cancel: function() {
                return this.transitionToRoute("/focusareas");
            }
        }
    });
}).call(this);

(function() {
    App.FocusareasEditController = Ember.ObjectController.extend({
        actions: {
            update: function() {
                var focusarea, shouldSave, themeId;
                focusarea = this.get("model");
                shouldSave = true;
                themeId = this.get("selectedTheme");
                if (Ember.isEmpty(focusarea.get("definition"))) {
                    this.notify.danger("Definition cannot be empty.");
                    shouldSave = false;
                }
                if (themeId == null) {
                    this.notify.danger("You have to create themes before creating focus areas!");
                    shouldSave = false;
                }
                if (shouldSave) {
                    this.store.find("theme", themeId).then(function(theme) {
                        return theme.get("focusareas").then(function(focusareas) {
                            focusareas.pushObject(focusarea);
                            theme.save();
                            return focusarea.save();
                        });
                    });
                    return this.transitionToRoute("/focusareas");
                } else {
                    return this.transitionToRoute("/focusareas/edit");
                }
            },
            "delete": function() {
                var administration;
                administration = this.get("model");
                administration.destroyRecord();
                return this.transitionToRoute("/focusareas");
            },
            cancel: function() {
                return this.transitionToRoute("/focusareas");
            }
        }
    });
}).call(this);