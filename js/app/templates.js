//NOTE: This is a generated file. Please do not edit. Your changes will be overridden!

Ember.TEMPLATES['about'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div>This is a template</div>");
  
});
Ember.TEMPLATES['administrations'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n            <tr>\r\n                <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "administration.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\r\n                <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "administration.color", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\r\n                <td style=\"width: 240px; text-align:center;\" class=\"pull-right\">\r\n                    <button class=\"btn btn-default btn-sm\">View</button>\r\n                    <button class=\"btn btn-default btn-sm\">Edit</button>\r\n                    <button class=\"btn btn-danger btn-sm\">Delete</button>\r\n                </td>\r\n            </tr>\r\n        ");
  return buffer;
  }

  data.buffer.push("<table class=\"table\">\r\n    <thead>\r\n    <tr>\r\n        <th>Forvaltning</th>\r\n        <th>Farve</th>\r\n        <th style=\"width: 240px; text-align:center;\">Action</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "administration", "in", "model", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    </tbody>\r\n</table>\r\n");
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
  


  data.buffer.push("<table class=\"table\">\r\n    <thead>\r\n    <tr>\r\n        <th style=\"width:200px\">Focus areas</th>\r\n        <th>Description</th>\r\n        <th style=\"width: 240px; text-align:center;\">Action</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr>\r\n        <td style=\"width:200px\">data</td>\r\n        <td>data</td>\r\n        <td style=\"width: 240px; text-align:center;\" class=\"pull-right\">\r\n            <button class=\"btn btn-default\">View</button>\r\n            <button class=\"btn btn-default\">Edit</button>\r\n            <button class=\"btn btn-danger\">Delete</button>\r\n        </td>\r\n    </tr>\r\n    </tbody>\r\n</table>");
  
});
Ember.TEMPLATES['index'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h2>Oversigt</h2>\r\n<div class=\"description\"></div>\r\n");
  
});
Ember.TEMPLATES['themes'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<table class=\"table\">\r\n    <thead>\r\n    <tr>\r\n        <th style=\"width:200px\">Themes</th>\r\n        <th>Description</th>\r\n        <th style=\"width: 240px; text-align:center;\">Action</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr>\r\n        <td style=\"width:200px\">data</td>\r\n        <td>data</td>\r\n        <td style=\"width: 240px; text-align:center;\" class=\"pull-right\">\r\n            <button class=\"btn btn-default\">View</button>\r\n            <button class=\"btn btn-default\">Edit</button>\r\n            <button class=\"btn btn-danger\">Delete</button>\r\n        </td>\r\n    </tr>\r\n    </tbody>\r\n</table>");
  
});
