(function() {
    Ember.Notify = Ember.ArrayProxy.extend({
        content: Ember.A(),
        timeout: 5e3,
        pushObject: function(object) {
            object.typeClass = "alert-" + object.type;
            this._super(object);
        },
        danger: function(message) {
            this.pushObject({
                type: "danger",
                message: message
            });
        },
        warning: function(message) {
            this.pushObject({
                type: "warning",
                message: message
            });
        },
        info: function(message) {
            this.pushObject({
                type: "info",
                message: message
            });
        },
        success: function(message) {
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
        idFromURL: function(currentUrl) {
            var regex, result;
            regex = /([a-f0-9]{24})/;
            result = regex.exec(currentUrl) || [ "", null ];
            if (result != null) {
                result = regex.exec(App.__container__.lookup("router:main").get("url")) || [ "", null ];
            }
            return result[1];
        },
        colorLuminance: function(hex, lum) {
            var c, i, rgb;
            hex = String(hex).replace(/[^0-9a-f]/g, "");
            if (hex.length < 6) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            lum = lum || 0;
            rgb = "#";
            c = void 0;
            i = void 0;
            i = 0;
            while (i < 3) {
                c = parseInt(hex.substr(i * 2, 2), 16);
                c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
                rgb += ("00" + c).substr(c.length);
                i++;
            }
            return rgb;
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
            application.inject("model", "utility", "utility:main");
            application.inject("view", "utility", "utility:main");
        }
    });
}).call(this);

(function() {
    Ember.I18n.translations = {
        application: {
            title: "Strategiske Indsatsplan",
            navbar: {
                graph: "Oversigt",
                strategies: "Planer",
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
        graph: {
            heading: "Oversigt",
            description: ""
        },
        strategies: {
            index: {
                heading: "Indsatsplaner"
            }
        },
        administrations: {
            index: {
                heading: "Forvalninger",
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
    Ember.MODEL_FACTORY_INJECTIONS = true;
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
    var AUTOSAVE_DELAY;
    AUTOSAVE_DELAY = 1500;
    App.AutosavableModel = Ember.Mixin.create({
        _buffers: function() {
            return Ember.Map.create();
        }.property()
    });
    App.AutosavableController = Ember.Mixin.create({
        bufferedFields: [],
        instaSaveFields: [],
        _allFields: function() {
            return this.get("bufferedFields").concat(this.get("instaSaveFields"));
        }.property(),
        setUnknownProperty: function(key, value) {
            if (this.get("ready")) {
                if (this.get("bufferedFields").contains(key)) {
                    this.get("_buffers").set(key, value);
                    return this._debouncedSave();
                } else if (this.get("instaSaveFields").contains(key)) {
                    this._super(key, value);
                    return this._save();
                } else {
                    return this._super(key, value);
                }
            }
        },
        unknownProperty: function(key) {
            if (this.get("ready")) {
                if (this.get("_allFields").contains(key) && this.get("_buffers").get(key)) {
                    return this.get("_buffers").get(key);
                } else {
                    return this._super(key);
                }
            }
        },
        _save: function() {
            var object, progressDone, _this;
            if (this.get("ready")) {
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
            }
        },
        _debouncedSave: function(immediate) {
            if (this.get("ready")) {
                console.log("App.AutosavableController::_debouncedSave: Save requestsed and scheduled: ", AUTOSAVE_DELAY);
                Ember.run.debounce(this, this._save, AUTOSAVE_DELAY, immediate);
            }
        },
        _saveNowAndClear: function() {
            if (this.get("ready")) {
                console.log("App.AutosavableController::_saveNowAndClear: clearing...");
                if (!this.get("content") || this.get("content.isDeleted")) {
                    return;
                }
                this._save();
                return this.set("_buffers", Ember.Map.create());
            }
        }.observesBefore("content"),
        actions: {
            save: function() {
                this._save();
            }
        }
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
    App.XGraphComponent = Ember.View.extend({
        editing: false,
        toggleEditing: function() {
            if (this.graph !== null) {
                this.graph.setOptions({
                    dataManipulation: this.get("editing")
                });
            }
        }.observes("editing"),
        data: null,
        graphDataSet: {
            nodes: new vis.DataSet(),
            edges: new vis.DataSet()
        },
        selected: "",
        graph: null,
        setup: function() {
            var container, data, options, _this;
            _this = this;
            container = $("<div>").appendTo(this.$())[0];
            data = this.get("graphDataSet");
            options = {
                stabilize: false,
                stabilizationIterations: 1,
                dataManipulation: this.get("editing")
            };
            this.graph = new vis.Graph(container, data, options);
            this.graph.on("click", function(data) {
                if (data.nodes.length > 0) {
                    _this.set("selected", data.nodes[0]);
                }
            });
            $(window).resize(function() {
                _this.graph.redraw();
            });
        },
        dataUpdates: function() {
            var d, delEdges, delNodes, md, newEdges;
            if (this.graph === null) {
                this.setup();
            }
            md = this.get("data");
            d = this.get("graphDataSet");
            if (d != null && md != null) {
                delNodes = d.nodes.get({
                    filter: function(i) {
                        var yes_;
                        yes_ = true;
                        md.nodes.forEach(function(j) {
                            if (i.id === j.id) {
                                yes_ = false;
                            }
                        });
                        return yes_;
                    }
                });
                d.nodes.remove(delNodes);
                d.nodes.update(md.nodes);
                delEdges = d.edges.get({
                    filter: function(i) {
                        var yes_;
                        yes_ = true;
                        md.edges.forEach(function(j) {
                            if (i.id === j.id) {
                                yes_ = false;
                            }
                        });
                        return yes_;
                    }
                });
                d.edges.remove(delEdges);
                newEdges = md.edges.filter(function(edge) {
                    return d.nodes.get(edge.from) !== null && d.nodes.get(edge.to) !== null;
                });
                d.edges.update(newEdges);
            }
        }.observes("data").on("didInsertElement")
    });
}).call(this);

(function() {
    App.ColorPicker = Ember.View.extend({
        didInsertElement: function() {
            return $("#color").colorpicker();
        }
    });
}).call(this);

(function() {
    App.StrategyTabAnchorView = Ember.View.extend({
        tagName: "a",
        didInsertElement: function() {
            return this.$().attr("href", "#/strategies/administration/" + this.get("administration_id"));
        }
    });
}).call(this);

(function() {
    App.StrategyTabPaneView = Ember.View.extend({
        tagName: "div",
        classNames: [ "strategies-administrations-tab tab-pane" ],
        classNameBindings: [ "isActive:active" ],
        isActive: function() {
            return this.get("firstObject").get("id") === this.get("administration_id");
        }.property("controller.model")
    });
}).call(this);

(function() {}).call(this);

(function() {
    App.AdministrationSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin).extend({
        attrs: {
            strategies: {
                serialize: "ids",
                deserialize: "ids"
            }
        }
    });
    App.Administration = DS.Model.extend({
        name: DS.attr("string"),
        color: DS.attr("string"),
        strategies: DS.hasMany("strategy", {
            async: true
        }),
        style: function() {
            return "background-color:" + this.get("color") + ";width:200px;display: block; padding: 10px;margin-right: 150px;";
        }.property("color"),
        tabStyle: function() {
            return "background-color:" + this.get("color") + ";width: 100%; height: 5px;";
        }.property("color"),
        shadedTabStyle: function() {
            return "background-color:" + this.utility.colorLuminance(this.get("color"), .4) + ";width: 100%; height: 3px;";
        }.property("color"),
        hashedID: function() {
            return "#" + this.get("id");
        }.property("id")
    });
}).call(this);

(function() {
    App.ThemeSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin).extend({
        attrs: {
            focusareas: {
                serialize: "ids",
                deserialize: "ids"
            }
        }
    });
    App.Theme = DS.Model.extend({
        definition: DS.attr("string"),
        focusareas: DS.hasMany("focusarea", {
            async: true
        }),
        hashedID: function() {
            return "#" + this.get("id");
        }.property("id")
    });
}).call(this);

(function() {
    App.FocusareaSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin).extend({
        attrs: {
            strategies: {
                serialize: "ids",
                deserialize: "ids"
            }
        }
    });
    App.Focusarea = DS.Model.extend({
        definition: DS.attr("string"),
        theme: DS.belongsTo("theme", {
            embedded: true
        }),
        strategies: DS.hasMany("strategy", {
            async: true
        }),
        hashedID: function() {
            return "#" + this.get("id");
        }.property("id")
    });
}).call(this);

(function() {
    App.Strategy = DS.Model.extend(App.AutosavableModel, {
        description: DS.attr("string"),
        selected: DS.attr("boolean"),
        administration: DS.belongsTo("administration", {
            embedded: true
        }),
        focusarea: DS.belongsTo("focusarea", {
            embedded: true
        })
    });
}).call(this);

(function() {
    App.Router.map(function() {
        this.resource("graph");
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
        this.resource("strategies", function() {
            return this.route("administration", {
                path: "/administration/:administration_id"
            });
        });
        this.resource("about");
        return this.resource("settings");
    });
}).call(this);

(function() {
    App.GraphRoute = Ember.Route.extend({
        model: function() {
            return this.store.findAll("strategy");
        }
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
            var error, theme_id;
            if (themes.get("length") !== 0) {
                theme_id = this.utility.idFromURL(window.location.href);
                try {
                    if (theme_id != null) {
                        return this.transitionTo("/themes/" + theme_id + "/focusareas");
                    } else {
                        return this.transitionTo("/themes/" + themes.get("firstObject").get("id") + "/focusareas");
                    }
                } catch (_error) {
                    error = _error;
                    return this.transitionTo("/themes/" + themes.get("firstObject").get("id") + "/focusareas");
                }
            } else {
                return this.transitionTo("/themes/new");
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
            theme_id = this.utility.idFromURL(window.location.href);
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
    App.StrategiesRoute = Ember.Route.extend({
        model: function(params) {
            return this.store.findAll("administration");
        },
        afterModel: function(administrations, transition) {
            var administration_id;
            if (administrations.get("length") !== 0) {
                administration_id = administrations.get("firstObject").get("id");
                return this.transitionTo("/strategies/administration/" + administration_id);
            } else {
                return this.transitionTo("/administrations/new");
            }
        }
    });
}).call(this);

(function() {
    App.StrategiesAdministrationRoute = Ember.Route.extend({
        model: function(params) {
            return Ember.Object.create({
                administration: this.store.find("administration", params.administration_id),
                themes: this.store.findAll("theme")
            });
        },
        setupController: function(controller, model) {
            controller.set("administration", model.administration);
            return controller.set("themes", model.themes);
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
                var administration, self;
                self = this;
                administration = this.get("model");
                return administration.destroyRecord().then(function() {
                    return self.transitionToRoute("/administrations");
                });
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
                var self, theme;
                theme = this.get("model");
                self = this;
                return theme.get("focusareas").then(function(focusareas) {
                    if (focusareas.get("length") === 0) {
                        return theme.destroyRecord().then(function() {
                            return self.transitionToRoute("/themes");
                        });
                    } else {
                        self.notify.danger("Cannot delete " + theme.get("definition") + ". Please delete all the focus areas related to this theme first.");
                        return self.transitionToRoute("/themes/" + theme.get("id") + "/focusareas");
                    }
                });
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
                theme_id = this.utility.idFromURL(window.location.href);
                if (Ember.isEmpty(focusarea.get("definition"))) {
                    this.notify.danger("Definition cannot be empty.");
                    shouldSave = false;
                }
                if (shouldSave) {
                    self = this;
                    return this.store.find("theme", theme_id).then(function(theme) {
                        focusarea.set("theme", theme);
                        return focusarea.save().then(function() {
                            theme.get("focusareas").pushObject(focusarea);
                            return theme.save().then(function() {
                                return self.transitionToRoute("/themes/" + theme_id + "/focusareas");
                            });
                        });
                    });
                } else {
                    return this.transitionToRoute("/themes/" + theme_id + "/focusareas/new");
                }
            },
            cancel: function() {
                return this.transitionToRoute("/themes/" + this.utility.idFromURL(window.location.href) + "/focusareas");
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
                theme_id = this.utility.idFromURL(window.location.href);
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
                var focusarea, self, theme;
                self = this;
                focusarea = this.get("model");
                theme = focusarea.get("theme");
                theme.get("focusareas").removeObject(focusarea);
                return theme.save().then(function() {
                    return focusarea.destroyRecord().then(function() {
                        return self.transitionToRoute("/themes/" + self.utility.idFromURL(window.location.href) + "/focusareas");
                    });
                });
            },
            cancel: function() {
                this.get("model").rollback();
                return this.transitionToRoute("/themes/" + this.utility.idFromURL(window.location.href) + "/focusareas");
            }
        }
    });
}).call(this);

(function() {
    App.StrategiesController = Ember.ArrayController.extend();
}).call(this);

(function() {
    App.StrategiesAdministrationController = Ember.ArrayController.extend({
        needs: "strategies",
        strategies: Ember.computed.alias("controllers.strategies")
    });
}).call(this);

(function() {
    App.AdministrationStrategyController = Ember.ObjectController.extend(App.AutosavableController, {
        needs: "strategiesAdministration",
        strategiesAdministration: Ember.computed.alias("controllers.strategiesAdministration"),
        bufferedFields: [ "description" ],
        instaSaveFields: [ "selected" ],
        ready: false,
        init: function() {
            var administration, focusarea, self;
            console.log("init called");
            focusarea = this.get("model");
            administration = this.get("strategiesAdministration.administration");
            self = this;
            return this.store.find("strategy", {
                focusarea: focusarea.get("id"),
                administration: administration.get("id")
            }).then(function(result) {
                var strategy;
                console.log("FOUND:", result.get("length"));
                if (result.get("length") === 0) {
                    console.log("CREATING...");
                    strategy = self.store.createRecord("strategy", {
                        isSelected: false,
                        administration: administration,
                        focusarea: focusarea
                    });
                    console.log("SAVING...");
                    strategy.save().then(function() {
                        console.log("SAVING AND PUSHING...");
                        administration.get("strategies").pushObject(strategy);
                        administration.save();
                        focusarea.get("strategies").pushObject(strategy);
                        focusarea.save();
                        console.log("STRATEGY:", strategy);
                        return self.set("model", strategy);
                    });
                } else {
                    self.set("model", result.get("firstObject"));
                }
                self.set("_buffers", Ember.Map.create());
                self.set("ready", true);
                return self._super();
            });
        }
    });
}).call(this);