//NOTE: This is a generated file. Please do not edit. Your changes will be overridden!

Ember.TEMPLATES['about'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div>This is a template</div>\r\n");
  
});
Ember.TEMPLATES['administrations'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Tilføj forvaltning");
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n            <tr>\r\n                <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "administration.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\r\n                <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "administration.color", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\r\n            </tr>\r\n        ");
  return buffer;
  }

  data.buffer.push("<div>\r\n    ");
  hashContexts = {'clicked': depth0,'class': depth0};
  hashTypes = {'clicked': "STRING",'class': "STRING"};
  options = {hash:{
    'clicked': ("showModal"),
    'class': ("add-administration btn btn-primary pull-right")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "administrations.new", options) : helperMissing.call(depth0, "link-to", "administrations.new", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n</div>\r\n");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n<table class=\"table\">\r\n    <thead>\r\n    <tr>\r\n        <th>Forvaltning</th>\r\n        <th>Farve</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "administration", "in", "model", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n    </tbody>\r\n</table>\r\n");
  return buffer;
  
});
Ember.TEMPLATES['administrations/new'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n    <form class=\"form-control\">\r\n        ");
  hashContexts = {'type': depth0,'value': depth0,'id': depth0};
  hashTypes = {'type': "STRING",'value': "ID",'id': "STRING"};
  options = {hash:{
    'type': ("text"),
    'value': ("name"),
    'id': ("name")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n        ");
  hashContexts = {'type': depth0,'value': depth0,'id': depth0};
  hashTypes = {'type': "STRING",'value': "ID",'id': "STRING"};
  options = {hash:{
    'type': ("text"),
    'value': ("color"),
    'id': ("color")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n    </form>\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("Navn");
  }

function program4(depth0,data) {
  
  
  data.buffer.push("Farve");
  }

  hashContexts = {'name': depth0,'fade': depth0,'footerButtonsBinding': depth0,'title': depth0};
  hashTypes = {'name': "STRING",'fade': "BOOLEAN",'footerButtonsBinding': "STRING",'title': "STRING"};
  options = {hash:{
    'name': ("administrationsNewModal"),
    'fade': (true),
    'footerButtonsBinding': ("modalButtons"),
    'title': ("Opret ny forvaltning")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['bs-modal'] || (depth0 && depth0['bs-modal'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bs-modal", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n");
  return buffer;
  
});
Ember.TEMPLATES['application'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("Strategiske Indsatsplan");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("Forvaltninger");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("Temaer");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("Fokus områder");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("Om");
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
  data.buffer.push("\r\n</div>\r\n<footer class=\"container\"></footer>");
  return buffer;
  
});
Ember.TEMPLATES['focusareas'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<table class=\"table\">\r\n    <thead>\r\n    <tr>\r\n        <th>Focus areas</th>\r\n        <th>Description</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr>\r\n        <td>data</td>\r\n        <td>data</td>\r\n    </tr>\r\n    </tbody>\r\n</table>");
  
});
Ember.TEMPLATES['index'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h2>Oversigt</h2>\r\n<div class=\"description\"></div>\r\n");
  
});
Ember.TEMPLATES['themes'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<table class=\"table\">\r\n    <thead>\r\n    <tr>\r\n        <th>Themes</th>\r\n        <th>Description</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr>\r\n        <td>data</td>\r\n        <td>data</td>\r\n    </tr>\r\n    </tbody>\r\n</table>");
  
});
