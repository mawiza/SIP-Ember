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
        },
        themeId: function(currentUrl) {
            var regex, result;
            regex = /\/themes\/(.*)\/focusareas/;
            result = regex.exec(currentUrl) || [ "", null ];
            console.log("THEME_ID ->", result[1]);
            return result[1];
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
            application.inject("route", "utility", "utility:main");
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
                themes: "Indsatsplaner",
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
                    info: "Er du sikker at du vil gerne slette forvaltning"
                }
            }
        },
        themes: {
            index: {
                heading: "Temaer",
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
                    info: "Er du sikker at du vil gerne denne slette tema"
                }
            }
        },
        focusareas: {
            index: {
                heading: "Fokus områder",
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
                    info: "Er du sikker at du vil gerne slette denne fokus område"
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
    window.App = Ember.Application.create({
        LOG_TRANSITIONS: true,
        LOG_TRANSITIONS_INTERNAL: true,
        LOG_VIEW_LOOKUPS: true,
        LOG_BINDINGS: true,
        LOG_ACTIVE_GENERATION: true,
        LOG_DEBUG: true,
        log: function(message, location, data) {
            if (this.LOG_DEBUG) {
                if (data != null) {
                    if (typeof data === "object") {
                        data = Ember.inspect(data);
                    }
                    console.log("DEBUG: " + this.appName + " : " + location + " : " + message);
                    return console.log("DEBUG: (continued) data: " + data);
                } else {
                    return console.log("DEBUG: " + this.appName + " : " + location + " : " + message);
                }
            }
        }
    });
    App.ApplicationAdapter = DS.RESTAdapter.extend({
        namespace: "api",
        host: "http://127.0.0.1:4567",
        corsWithCredentials: true
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
            path: "/administrations/edit/:administration_id"
        });
        this.resource("themes", function() {
            this.route("new");
            this.route("edit", {
                path: "/edit/:theme_id"
            });
            return this.resource("focusareas", {
                path: "/:theme_id/focusareas"
            }, function() {
                this.route("new", {
                    path: "/new"
                });
                return this.route("edit", {
                    path: "/edit/:focusarea_id"
                });
            });
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
    App.ThemesIndexRoute = Ember.Route.extend({
        model: function(params) {
            App.log("Loading the model for theme", "App.ThemesIndexRoute.model", params);
            return this.store.find("theme");
        },
        afterModel: function(themes, transition) {
            var theme_id;
            theme_id = this.utility.themeId(window.location.href);
            if (theme_id != null) {
                console.log("THEME-ID->", theme_id);
                return this.transitionTo("/themes/" + theme_id + "/focusareas");
            } else {
                return this.transitionTo("/themes/" + themes.get("firstObject").get("id") + "/focusareas");
            }
        }
    });
    App.ThemesRoute = Ember.Route.extend({
        model: function() {
            App.log("Loading the model for theme", "App.ThemesRoute.model");
            return this.store.find("theme");
        },
        afterModel: function(themes, transition) {
            var theme_id;
            theme_id = this.utility.themeId(window.location.href);
            if (theme_id != null) {
                return this.transitionTo("/themes/" + theme_id + "/focusareas");
            } else if (themes.get("firstObject") != null) {
                return this.transitionTo("/themes/" + themes.get("firstObject").get("id") + "/focusareas");
            } else {
                return this.transitionTo("/themes/new");
            }
        }
    });
    App.ThemesNewRoute = Ember.Route.extend({
        model: function() {
            App.log("Loading the model for theme", "App.ThemesNewRoute.model");
            return this.store.createRecord("theme");
        }
    });
    App.ThemesEditRoute = Ember.Route.extend({
        model: function(params) {
            App.log("Loading the model for theme", "App.ThemesEditRoute.model", params);
            return this.modelFor("theme", params);
        },
        setupController: function(controller, model) {
            var focusareas;
            this._super(controller, model);
            focusareas = this.store.find("focusarea", {
                theme: model.id
            });
            return focusareas.then(function() {
                App.log("Setting up the controller for edit theme", "App.ThemesEditRoute.setupController", focusareas);
                return controller.set("focusareasLength", focusareas.get("length"));
            });
        }
    });
}).call(this);

(function() {
    App.FocusareasRoute = Ember.Route.extend({
        model: function(params) {
            console.log("params:", params);
            return this.store.filter("focusarea", {}, function(focusarea) {
                if (focusarea.get("data.theme.id") === params.theme_id) {
                    return true;
                }
            });
        }
    });
    App.FocusareasNewRoute = Ember.Route.extend({
        model: function() {
            var focusarea;
            return focusarea = this.store.createRecord("focusarea");
        }
    });
    App.FocusareasEditRoute = Ember.Route.extend({
        model: function() {
            return this.modelFor("focusarea");
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

(function() {}).call(this);

(function() {
    App.ThemesNewController = Ember.ObjectController.extend({
        actions: {
            submit: function() {
                var self, shouldSave, theme;
                theme = this.get("model");
                shouldSave = true;
                if (Ember.isEmpty(theme.get("definition"))) {
                    this.notify.danger("Definition cannot be empty.");
                    shouldSave = false;
                }
                if (shouldSave) {
                    self = this;
                    return theme.save().then(function(savedTheme) {
                        App.log("Saving the theme and transitioning to the theme's focusareas", "App.ThemesNewController.submit", savedTheme.get("id"));
                        return self.transitionToRoute("/themes/" + theme.get("id") + "/focusareas");
                    });
                } else {
                    return this.transitionToRoute("/themes/new");
                }
            },
            cancel: function() {
                this.get("model").rollback();
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
                    return this.transitionToRoute("/themes/" + theme.get("id") + "/focusareas");
                } else {
                    return this.transitionToRoute("/themes/edit");
                }
            },
            "delete": function() {
                var notify, self, theme;
                theme = this.get("model");
                notify = this.notify;
                if (this.get("focusareasLength") === 0) {
                    self = this;
                    App.log("Deleting the theme without focusareas", "App.ThemesEditController.delete", this.get("focusareasLength"));
                    return theme.destroyRecord().then(function() {
                        return self.transitionToRoute("/themes");
                    });
                } else {
                    App.log("Not deleting the theme with focusareas", "App.ThemesEditController.delete", this.get("focusareasLength"));
                    notify.danger("Cannot delete " + theme.get("definition") + ". Please delete all the focus areas related to this theme first.");
                    return this.transitionToRoute("/themes/" + theme.id + "/focusareas");
                }
            },
            cancel: function() {
                this.get("model").rollback();
                return this.transitionToRoute("/themes/" + this.get("model").get("id") + "/focusareas");
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
                var focusarea, self, shouldSave, theme_id;
                focusarea = this.get("model");
                shouldSave = true;
                theme_id = this.utility.themeId(window.location.href);
                if (Ember.isEmpty(focusarea.get("definition"))) {
                    this.notify.danger("Definition cannot be empty.");
                    shouldSave = false;
                }
                if (shouldSave) {
                    self = this;
                    console.log("saving");
                    return this.store.find("theme", theme_id).then(function(theme) {
                        focusarea.set("theme", theme);
                        return focusarea.save().then(function() {
                            console.log("transitioning to: ", theme_id);
                            return self.transitionToRoute("/themes/" + theme_id + "/focusareas");
                        });
                    });
                } else {
                    return this.transitionToRoute("/themes/" + theme_id + "/focusareas/new");
                }
            },
            cancel: function() {
                return this.transitionToRoute("/themes/" + this.utility.themeId(window.location.href) + "/focusareas");
            }
        }
    });
}).call(this);

(function() {
    App.FocusareasEditController = Ember.ObjectController.extend({
        actions: {
            update: function() {
                var focusarea, self, shouldSave, theme_id;
                focusarea = this.get("model");
                shouldSave = true;
                theme_id = this.utility.themeId(window.location.href);
                if (Ember.isEmpty(focusarea.get("definition"))) {
                    this.notify.danger("Definition cannot be empty.");
                    shouldSave = false;
                }
                if (theme_id == null) {
                    this.notify.danger("You have to create themes before creating focus areas!");
                    shouldSave = false;
                }
                if (shouldSave) {
                    self = this;
                    return this.store.find("theme", theme_id).then(function(theme) {
                        focusarea.set("theme", theme);
                        return focusarea.save().then(function() {
                            return self.transitionToRoute("/themes/" + theme_id + "/focusareas");
                        });
                    });
                } else {
                    return this.transitionToRoute("/themes/" + theme_id + "/focusareas/edit");
                }
            },
            "delete": function() {
                var administration;
                administration = this.get("model");
                administration.destroyRecord();
                return this.transitionToRoute("/themes/" + this.utility.themeId(window.location.href) + "/focusareas");
            },
            cancel: function() {
                this.get("model").rollback();
                return this.transitionToRoute("/themes/" + this.utility.themeId(window.location.href) + "/focusareas");
            }
        }
    });
}).call(this);