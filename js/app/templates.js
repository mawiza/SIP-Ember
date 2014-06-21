//NOTE: This is a generated file. Please do not edit. Your changes will be overridden!

Ember.TEMPLATES['about'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div>This is a template</div>\r\n");
  
});
Ember.TEMPLATES['administrations'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\r\n        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "administrations.index.add", options) : helperMissing.call(depth0, "t", "administrations.index.add", options))));
  data.buffer.push("\r\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\r\n                <tr>\r\n                    <td class=\"administration-name\">\r\n                        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "administrations.edit", "administration", options) : helperMissing.call(depth0, "link-to", "administrations.edit", "administration", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                    </td>\r\n                    <td class=\"administration-color\"><span class=\"label label-default\" ");
  hashContexts = {'style': depth0};
  hashTypes = {'style': "ID"};
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'style': ("administration.style")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "administration.color", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span></td>\r\n                </tr>\r\n            ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "administration.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                        ");
  return buffer;
  }

  data.buffer.push("<div>\r\n    ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("add-administration btn btn-primary")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "administrations.new", options) : helperMissing.call(depth0, "link-to", "administrations.new", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n</div>\r\n<br/>\r\n<div class=\"panel panel-default\">\r\n    <div class=\"panel-body\">\r\n        <table class=\"table table-striped\">\r\n            <thead>\r\n            <tr>\r\n                <th>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "administrations.index.name", options) : helperMissing.call(depth0, "t", "administrations.index.name", options))));
  data.buffer.push("</th>\r\n                <th>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "administrations.index.color", options) : helperMissing.call(depth0, "t", "administrations.index.color", options))));
  data.buffer.push("</th>\r\n            </tr>\r\n            </thead>\r\n            <tbody>\r\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "administration", "in", "model", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n</div>\r\n");
  return buffer;
  
});
Ember.TEMPLATES['administrations/edit'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"\">\r\n    <div class=\"col-md-6 col-md-offset-3\">\r\n        <form role=\"form-control\">\r\n            <div class=\"panel panel-info\">\r\n                <div class=\"panel-heading\">\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "administrations.edit.heading", options) : helperMissing.call(depth0, "t", "administrations.edit.heading", options))));
  data.buffer.push("\r\n                </div>\r\n                <div class=\"panel-body\">\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "x-notify", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                    <div class=\"form-group\">\r\n                        <label for=\"exampleInputEmail1\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "administrations.edit.name", options) : helperMissing.call(depth0, "t", "administrations.edit.name", options))));
  data.buffer.push("</label>\r\n                        ");
  hashContexts = {'type': depth0,'class': depth0,'value': depth0,'id': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'value': "ID",'id': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'value': ("name"),
    'id': ("name"),
    'placeholder': ("Navn...")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label for=\"exampleInputPassword1\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "administrations.edit.color", options) : helperMissing.call(depth0, "t", "administrations.edit.color", options))));
  data.buffer.push("</label>\r\n                        ");
  hashContexts = {'type': depth0,'class': depth0,'value': depth0,'id': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'value': "ID",'id': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("color-picker form-control"),
    'value': ("color"),
    'id': ("color"),
    'placeholder': ("Farve...")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.ColorPicker", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                    </div>\r\n                </div>\r\n                <div class=\"panel-footer\">\r\n                    <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "update", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"update-button btn btn-default\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "administrations.edit.update", options) : helperMissing.call(depth0, "t", "administrations.edit.update", options))));
  data.buffer.push("</button>\r\n                    <button data-toggle=\"modal\" data-target=\"#delete-administration\" class=\"btn btn-default\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "administrations.edit.delete", options) : helperMissing.call(depth0, "t", "administrations.edit.delete", options))));
  data.buffer.push("</button>\r\n                </div>\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>\r\n\r\n<div id=\"delete-administration\" role=\"dialog\" class=\"modal fade\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\" style=\"width:400px\">\r\n        <div class=\"modal-content\"  style=\"width:400px\">\r\n            <div class=\"modal-header modal-warning\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n                <h4 class=\"modal-title\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "administrations.edit.delete", options) : helperMissing.call(depth0, "t", "administrations.edit.delete", options))));
  data.buffer.push("</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <p>");
  hashContexts = {'nameBinding': depth0};
  hashTypes = {'nameBinding': "STRING"};
  options = {hash:{
    'nameBinding': ("name")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "administrations.edit.modal.info", options) : helperMissing.call(depth0, "t", "administrations.edit.modal.info", options))));
  data.buffer.push(" </p>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "delete", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" data-dismiss=\"modal\" class=\"delete-button btn btn-danger\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "administrations.edit.delete", options) : helperMissing.call(depth0, "t", "administrations.edit.delete", options))));
  data.buffer.push("</button>\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "administrations.edit.cancel", options) : helperMissing.call(depth0, "t", "administrations.edit.cancel", options))));
  data.buffer.push("</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});
Ember.TEMPLATES['administrations/new'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"\">\r\n    <div class=\"col-md-6 col-md-offset-3\">\r\n        <form role=\"form-control\">\r\n            <div class=\"panel panel-info\">\r\n                <div class=\"panel-heading\">\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "administrations.new.heading", options) : helperMissing.call(depth0, "t", "administrations.new.heading", options))));
  data.buffer.push("\r\n                </div>\r\n                <div class=\"panel-body\">\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "x-notify", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                    <div class=\"form-group\">\r\n                        <label for=\"exampleInputEmail1\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "administrations.new.name", options) : helperMissing.call(depth0, "t", "administrations.new.name", options))));
  data.buffer.push("</label>\r\n                        ");
  hashContexts = {'type': depth0,'class': depth0,'value': depth0,'id': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'value': "ID",'id': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'value': ("name"),
    'id': ("name"),
    'placeholder': ("Navn...")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label for=\"exampleInputPassword1\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "administrations.new.color", options) : helperMissing.call(depth0, "t", "administrations.new.color", options))));
  data.buffer.push("</label>\r\n                        ");
  hashContexts = {'type': depth0,'class': depth0,'value': depth0,'id': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'value': "ID",'id': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'value': ("color"),
    'id': ("color"),
    'placeholder': ("Farve...")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.ColorPicker", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                    </div>\r\n                </div>\r\n                <div class=\"panel-footer\">\r\n                    <button type=\"submit\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "submit", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"submit-button btn btn-default\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "administrations.new.create", options) : helperMissing.call(depth0, "t", "administrations.new.create", options))));
  data.buffer.push("</button>\r\n                </div>\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>\r\n\r\n");
  return buffer;
  
});
Ember.TEMPLATES['application'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1, hashTypes, hashContexts, options;
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "application.title", options) : helperMissing.call(depth0, "t", "application.title", options))));
  }

function program3(depth0,data) {
  
  var stack1, hashTypes, hashContexts, options;
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "application.navbar.administrations", options) : helperMissing.call(depth0, "t", "application.navbar.administrations", options))));
  }

function program5(depth0,data) {
  
  var stack1, hashTypes, hashContexts, options;
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "application.navbar.themes", options) : helperMissing.call(depth0, "t", "application.navbar.themes", options))));
  }

function program7(depth0,data) {
  
  var stack1, hashTypes, hashContexts, options;
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "application.navbar.focusareas", options) : helperMissing.call(depth0, "t", "application.navbar.focusareas", options))));
  }

function program9(depth0,data) {
  
  var stack1, hashTypes, hashContexts, options;
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "application.navbar.about", options) : helperMissing.call(depth0, "t", "application.navbar.about", options))));
  }

  data.buffer.push("<div class=\"container\">\r\n    <div class=\"navbar navbar-default\" role=\"navigation\">\r\n        <div class=\"container-fluid\">\r\n            <div class=\"navbar-header\">\r\n                ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("navbar-brand title-link")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n            </div>\r\n            <div class=\"navbar-collapse collapse\">\r\n                <ul class=\"nav navbar-nav navbar-right\">\r\n                    <li>");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("administrations-link")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "administrations", options) : helperMissing.call(depth0, "link-to", "administrations", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\r\n                    <li>");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("themes-link")
  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "themes", options) : helperMissing.call(depth0, "link-to", "themes", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\r\n                    <li>");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("focusareas-link")
  },inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "focusareas", options) : helperMissing.call(depth0, "link-to", "focusareas", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\r\n                    <li>");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("about-link")
  },inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "about", options) : helperMissing.call(depth0, "link-to", "about", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n</div>\r\n<div id=\"footer\">\r\n    <div class=\"container\">\r\n        <div class=\"container-fluid\">\r\n            <p class=\"text-muted\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "application.footer.organization", options) : helperMissing.call(depth0, "t", "application.footer.organization", options))));
  data.buffer.push("</p>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
  return buffer;
  
});
Ember.TEMPLATES['components/x-notify-message'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":notify-message :alert :alert-dismissable message.typeClass")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\r\n    <strong>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.capitalize || (depth0 && depth0.capitalize)),stack1 ? stack1.call(depth0, "message.type", options) : helperMissing.call(depth0, "capitalize", "message.type", options))));
  data.buffer.push("</strong> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "message.message", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n</div>");
  return buffer;
  
});
Ember.TEMPLATES['components/x-notify'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, hashTypes, hashContexts, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\r\n    ");
  hashContexts = {'message': depth0};
  hashTypes = {'message': "ID"};
  options = {hash:{
    'message': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['x-notify-message'] || (depth0 && depth0['x-notify-message'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "x-notify-message", options))));
  data.buffer.push("\r\n");
  return buffer;
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "messages", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});
Ember.TEMPLATES['focusareas'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<table class=\"table\">\r\n    <thead>\r\n    <tr>\r\n        <th>Focus areas</th>\r\n        <th>Description</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr>\r\n        <td>data</td>\r\n        <td>data</td>\r\n    </tr>\r\n    </tbody>\r\n</table>");
  
});
Ember.TEMPLATES['index'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<h2>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "index.heading", options) : helperMissing.call(depth0, "t", "index.heading", options))));
  data.buffer.push("</h2>\r\n<div class=\"description\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "index.description", options) : helperMissing.call(depth0, "t", "index.description", options))));
  data.buffer.push("</div>\r\n");
  return buffer;
  
});
Ember.TEMPLATES['themes'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<table class=\"table\">\r\n    <thead>\r\n    <tr>\r\n        <th>Themes</th>\r\n        <th>Description</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr>\r\n        <td>data</td>\r\n        <td>data</td>\r\n    </tr>\r\n    </tbody>\r\n</table>");
  
});
