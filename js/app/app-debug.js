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
        },
        d2h: function(d) {
            return d.toString(16);
        },
        h2d: function(h) {
            return parseInt(h, 16);
        },
        stringToHex: function(tmp) {
            var c, i, str, tmp_len;
            str = "";
            i = 0;
            tmp_len = tmp.length;
            c = void 0;
            while (i < tmp_len) {
                c = tmp.charCodeAt(i);
                str += this.d2h(c) + " ";
                i += 1;
            }
            return str;
        },
        hexToString: function(tmp) {
            var arr, arr_len, c, i, str;
            arr = tmp.split(" ");
            str = "";
            i = 0;
            arr_len = arr.length;
            c = void 0;
            while (i < arr_len) {
                c = String.fromCharCode(this.h2d(arr[i]));
                str += c;
                i += 1;
            }
            return str;
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
            application.inject("component", "utility", "utility:main");
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
                heading: "Forvaltninger",
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
    Handlebars.registerHelper("key_value", function(obj, fn) {
        var buffer, key;
        buffer = "";
        key = void 0;
        console.log("OBJECT!!!", obj);
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                buffer += fn({
                    key: key,
                    value: obj[key]
                });
            }
        }
        return buffer;
    });
    Ember.MODEL_FACTORY_INJECTIONS = true;
    window.App = Ember.Application.create({
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
    window.App.ready = function() {
        $(document).ajaxStart(function() {
            return NProgress.start();
        });
        return $(document).ajaxStop(function() {
            return NProgress.done();
        });
    };
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
                configurePhysics: false,
                navigation: true,
                width: "100%",
                height: "600px",
                stabilize: false,
                stabilizationIterations: 1,
                dataManipulation: this.get("editing"),
                tooltip: {
                    delay: 300,
                    fontColor: "black",
                    fontSize: 14,
                    fontFace: "verdana",
                    color: {
                        border: "#666",
                        background: "#FFFFC6"
                    }
                }
            };
            this.graph = new vis.Network(container, data, options);
            this.graph.on("click", function(data) {
                var node_id;
                console.log("clicked");
                if (data.nodes.length > 0) {
                    node_id = data.nodes[0];
                    _this.set("selected", node_id);
                    _this.get("data").nodes.forEach(function(node) {
                        var id;
                        if (node.id === node_id) {
                            id = "#focusarea" + node.focusarea_id;
                            return $(id).collapse("toggle");
                        }
                    });
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
    var focusareas;
    App.XGraphSummaryComponent = Ember.Component.extend({
        dataSet: null,
        nodes: [],
        edges: [],
        grouped: {}
    }, focusareas = {}, {
        processDataSet: function() {
            var dataSet;
            dataSet = this.get("dataSet");
            this.set("nodes", dataSet["nodes"]);
            this.set("edges", dataSet["edges"]);
            this.orderByGroup(dataSet);
            return this.orderByFocusareas(dataSet);
        }.observes("dataSet").on("didInsertElement"),
        orderByGroup: function(dataSet) {
            var grouped;
            grouped = {};
            dataSet["nodes"].forEach(function(node) {
                if (grouped[node.group] != null) {
                    return grouped[node.group].push(node);
                } else {
                    return grouped[node.group] = [ node ];
                }
            });
            this.set("grouped", grouped);
            return this.get("orderedGroupToHtml");
        },
        orderedGroupToHtml: function() {
            var groupedNodes, html;
            html = "<div>";
            groupedNodes = this.get("grouped");
            Object.keys(groupedNodes).forEach(function(group) {
                var nodes;
                nodes = groupedNodes[group];
                html += "<div style='margin-bottom: 5px;' class='panel panel-info'><div style='color:" + nodes[0]["color"] + ";' class='panel-heading'><h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordion' href='#administration" + nodes[0].administration_id + "'>" + group + "</a></h4></div>";
                html += "<div id='administration" + nodes[0].administration_id + "' class='panel-collapse collapse out'><div class='panel-body'>";
                nodes.forEach(function(value) {
                    return html += "<div>" + value["description"] + "</div><hr>";
                });
                return html += "</div></div></div>";
            });
            html += "</div>";
            return $("#ordered_by_group").html(html);
        }.property("grouped.@each"),
        orderByFocusareas: function(dataSet) {
            focusareas = {};
            dataSet["nodes"].forEach(function(node) {
                if (focusareas[node.focusarea] != null) {
                    return focusareas[node.focusarea].push(node);
                } else {
                    return focusareas[node.focusarea] = [ node ];
                }
            });
            this.set("focusareas", focusareas);
            return this.get("orderedFocusareasToHtml");
        },
        orderedFocusareasToHtml: function() {
            var groupedFocusareasNodes, html;
            html = "<div>";
            groupedFocusareasNodes = this.get("focusareas");
            Object.keys(groupedFocusareasNodes).forEach(function(focusarea) {
                var nodes;
                nodes = groupedFocusareasNodes[focusarea];
                html += "<div style='margin-bottom: 5px;' class='panel panel-info'><div class='panel-heading'><h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordion' href='#focusarea" + nodes[0].focusarea_id + "'>" + focusarea + "</a></h4></div>";
                html += "<div id='focusarea" + nodes[0].focusarea_id + "' class='panel-collapse collapse out'><div class='panel-body'>";
                nodes.forEach(function(value) {
                    return html += "<div><span class='badge' style='background-color: " + value["color"] + "'>" + value["group"] + "</span> " + value["description"] + "</div>";
                });
                return html += "</div></div></div>";
            });
            html += "</div>";
            return $("#ordered_by_focusareas").html(html);
        }.property("focusareas.@each")
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
        shadedTabContentStyle: function() {
            return "background-color:" + this.utility.colorLuminance(this.get("color"), .8) + ";";
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
            embedded: "always"
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
        return this.resource("strategies", function() {
            return this.route("administration", {
                path: "/administration/:administration_id"
            });
        });
    });
}).call(this);

(function() {
    App.ApplicationRoute = Ember.Route.extend({
        actions: {
            loading: function() {
                NProgress.start();
                this.router.one("didTransition", function() {
                    return setTimeout(function() {
                        return NProgress.done();
                    }, 50);
                });
                return true;
            },
            error: function() {
                return setTimeout(function() {
                    return NProgress.done();
                }, 50);
            }
        }
    });
}).call(this);

(function() {
    App.GraphRoute = Ember.Route.extend({
        model: function() {
            var model;
            return model = this.store.findAll("strategy");
        },
        setupController: function(controller, model) {
            var strategies;
            strategies = model.filterProperty("selected", true);
            controller.set(model, strategies);
            controller.set("selectedStrategiesCount", strategies.get("length"));
            controller.get("nodes").clear();
            this.loadNodes(controller, strategies);
            controller.get("edges").clear();
            return this.loadEdges(controller, strategies);
        },
        loadNodes: function(controller, strategies) {
            var self;
            self = this;
            return strategies.forEach(function(strategy) {
                var node;
                node = {};
                node["id"] = strategy.get("id");
                node["description"] = strategy.get("description");
                node["selected"] = strategy.get("selected");
                return self.store.find("administration", strategy.get("administration.id")).then(function(administration) {
                    node["group"] = administration.get("name");
                    node["label"] = administration.get("name");
                    node["color"] = administration.get("color");
                    node["color.highlight"] = administration.get("shadedTabStyle");
                    node["administration_id"] = administration.get("id");
                    return self.store.find("focusarea", strategy.get("focusarea.id")).then(function(focusarea) {
                        node["focusarea"] = focusarea.get("definition");
                        node["focusarea_id"] = focusarea.get("id");
                        return self.store.find("theme", focusarea.get("theme.id")).then(function(theme) {
                            node["title"] = "<b><u>" + theme.get("definition") + "</u></b><br><em>" + focusarea.get("definition") + "</em>";
                            node["theme"] = theme.get("definition");
                            node["theme_id"] = theme.get("id");
                            return controller.get("nodes").pushObject(node);
                        });
                    });
                });
            });
        },
        loadEdges: function(controller) {
            return this.store.find("focusarea").then(function(focusareas) {
                return focusareas.forEach(function(focusarea) {
                    return focusarea.get("strategies").then(function(strategies) {
                        var edge, i, selectedStrategies, strategiesA, _i, _j, _ref, _ref1, _results;
                        console.log("Strategies:", strategies, "=", strategies.get("length"));
                        if (strategies != null && strategies.get("length") > 1) {
                            strategiesA = strategies.toArray();
                            selectedStrategies = [];
                            for (i = _i = 0, _ref = strategiesA.length - 1; _i <= _ref; i = _i += 1) {
                                if (strategiesA[i].get("selected")) {
                                    selectedStrategies.push(strategiesA[i]);
                                }
                            }
                            _results = [];
                            for (i = _j = 0, _ref1 = selectedStrategies.length - 1; _j <= _ref1; i = _j += 1) {
                                if (i > 0 && i <= selectedStrategies.length) {
                                    edge = {};
                                    edge["to"] = selectedStrategies[i - 1].get("id");
                                    edge["from"] = selectedStrategies[i].get("id");
                                    _results.push(controller.get("edges").pushObject(edge));
                                } else {
                                    _results.push(void 0);
                                }
                            }
                            return _results;
                        }
                    });
                });
            });
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
            console.log("AFTER MODEL - ThemesRoute", window.location.href);
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
                var administration, count, self, shouldSave;
                administration = this.get("model");
                shouldSave = true;
                if (Ember.isEmpty(administration.get("name"))) {
                    this.notify.danger("Name cannot be empty.");
                    shouldSave = false;
                }
                count = 0;
                this.store.all("administration").forEach(function(record) {
                    if (record.get("name") === administration.get("name")) {
                        return count += 1;
                    }
                });
                if (count > 1) {
                    this.notify.danger(administration.get("name") + " is already used.");
                    shouldSave = false;
                }
                if (Ember.isEmpty(administration.get("color"))) {
                    this.notify.danger("Color cannot be empty.");
                    shouldSave = false;
                }
                if (shouldSave) {
                    self = this;
                    return administration.save().then(function() {
                        return self.transitionToRoute("/administrations");
                    });
                }
            },
            cancel: function() {
                this.get("model").rollback();
                return this.transitionToRoute("/administrations");
            }
        }
    });
}).call(this);

(function() {
    App.AdministrationsEditController = Ember.ObjectController.extend({
        actions: {
            update: function() {
                var administration, count, self, shouldSave;
                administration = this.get("model");
                shouldSave = true;
                if (Ember.isEmpty(administration.get("name"))) {
                    this.notify.danger("Name cannot be empty.");
                    shouldSave = false;
                }
                count = 0;
                this.store.all("administration").forEach(function(record) {
                    if (record.get("name") === administration.get("name")) {
                        return count += 1;
                    }
                });
                if (count > 1) {
                    this.notify.danger(administration.get("name") + " is already used.");
                    shouldSave = false;
                }
                if (Ember.isEmpty(administration.get("color"))) {
                    this.notify.danger("Color cannot be empty.");
                    shouldSave = false;
                }
                if (shouldSave) {
                    self = this;
                    return administration.save().then(function() {
                        return self.transitionToRoute("/administrations");
                    });
                }
            },
            "delete": function() {
                var administration, self;
                self = this;
                administration = this.get("model");
                console.log("delete administration");
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
                var self, shouldSave, theme;
                theme = this.get("model");
                shouldSave = true;
                if (Ember.isEmpty(theme.get("definition"))) {
                    this.notify.danger("Definition cannot be empty.");
                    shouldSave = false;
                }
                if (shouldSave) {
                    console.log("Finding the focusareas");
                    self = this;
                    return this.store.find("focusarea", {
                        theme_id: theme.get("id")
                    }).then(function(focusareas) {
                        console.log("focusarea->", focusareas);
                        return theme.get("focusareas").then(function(themeFocusareas) {
                            themeFocusareas.clear();
                            focusareas.forEach(function(focusarea) {
                                return themeFocusareas.pushObject(focusarea);
                            });
                            return theme.save().then(function() {
                                console.log("SAVED FOCUSAREA RESOLVED");
                                return self.transitionToRoute("/themes/" + theme.get("id") + "/focusareas");
                            });
                        });
                    });
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
                    return focusarea.save().then(function() {
                        return self.transitionToRoute("/themes/" + theme_id + "/focusareas");
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
            focusarea = this.get("model");
            administration = this.get("strategiesAdministration.administration");
            self = this;
            return this.store.find("strategy", {
                focusarea: focusarea.get("id"),
                administration: administration.get("id")
            }).then(function(result) {
                var error, strategy;
                try {
                    self.set("_buffers", Ember.Map.create());
                    if (result.get("length") === 0) {
                        return administration.then(function(administration) {
                            var strategy;
                            strategy = self.store.createRecord("strategy", {
                                isSelected: false,
                                administration: administration,
                                focusarea: focusarea
                            });
                            return strategy.save().then(function() {
                                administration.get("strategies").then(function(strategies) {
                                    strategies.pushObject(strategy);
                                    return administration.save().then(function() {});
                                });
                                focusarea.get("strategies").then(function(strategies) {
                                    strategies.pushObject(strategy);
                                    return focusarea.save().then(function() {});
                                });
                                self.set("model", strategy);
                                self.set("ready", true);
                                return self._super();
                            });
                        });
                    } else {
                        strategy = result.get("firstObject");
                        self.store.find("administration", strategy.get("administration.id")).then(function(administration) {
                            return administration.get("strategies").then(function(strategies) {
                                var found;
                                found = false;
                                strategies.forEach(function(savedStrategy) {
                                    if (savedStrategy.get("id") === strategy.get("id")) {
                                        return found = true;
                                    }
                                });
                                if (!found) {
                                    strategies.pushObject(strategy);
                                    return administration.save().then(function() {});
                                }
                            });
                        });
                        self.store.find("focusarea", strategy.get("focusarea.id")).then(function(focusarea) {
                            return focusarea.get("strategies").then(function(strategies) {
                                var found;
                                found = false;
                                strategies.forEach(function(savedStrategy) {
                                    if (savedStrategy.get("id") === strategy.get("id")) {
                                        return found = true;
                                    }
                                });
                                if (!found) {
                                    strategies.pushObject(strategy);
                                    return focusarea.save().then(function() {});
                                }
                            });
                        });
                        self.set("model", strategy);
                        self.set("ready", true);
                        return self._super();
                    }
                } catch (_error) {
                    error = _error;
                    return self._super();
                }
            });
        }
    });
}).call(this);

(function() {
    App.GraphController = Ember.ArrayController.extend({
        nodes: [],
        edges: [],
        dataSet: function() {
            var data;
            data = {
                nodes: this.get("nodes"),
                edges: this.get("edges")
            };
            return data;
        }.property("nodes.@each", "edges.@each"),
        init: function() {
            this.set("nodes", []);
            return this.set("edges", []);
        }
    });
}).call(this);