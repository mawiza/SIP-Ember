var compiler = require('ember-template-compiler');
var fs = require('fs');
var walk = require('walk');
var templatesjs = "js/app/templates.js";

var walker  = walk.walk('js/app/templates', { followLinks: false });
var output = "";

fs.truncate(templatesjs, 0, function(){console.log('done')});

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

walker.on('file', function(root, stat, next) {
    if(stat.name.endsWith(".hbs")){
        var template = fs.readFileSync(root + '/' + stat.name).toString();
        var input = compiler.precompile(template).toString();
        output = "Ember.TEMPLATES['" + stat.name.replace(".hbs", "") + "'] = Ember.Handlebars.template(" + input + ");";
        fs.appendFile(templatesjs, output + "\n");
    }

    next();
});
