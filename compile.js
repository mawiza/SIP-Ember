var compiler = require('ember-template-compiler');
var fs = require('fs');
var walk = require('walk');
var templatesjs = "js/app/templates.js";

var walker  = walk.walk('js/app/templates', { followLinks: false });

var normalizeStr = function(str){
    var pattern = /[A-Z]/g;
    var normalizedStr = str;
    if(pattern.test(str)){
        var char = str.charAt(pattern.lastIndex-1);
        normalizedStr = str.replace(char, "/" + char.toLowerCase());
    }
    if(pattern.test(normalizedStr)){
        normalizedStr = normalizeStr(normalizedStr);
    }
    return normalizedStr;
};

fs.writeFile(templatesjs, '//NOTE: This is a generated file. Please do not edit. Your changes will be overridden!\n\n');

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

walker.on('file', function(root, stat, next) {
    if(stat.name.endsWith(".hbs")){
        var template = fs.readFileSync(root + '/' + stat.name).toString();
        var input = compiler.precompile(template).toString();
        var templateName = stat.name.replace(".hbs", "")
        var output = "Ember.TEMPLATES['" + normalizeStr(templateName) + "'] = Ember.Handlebars.template(" + input + ");";
        fs.appendFile(templatesjs, output + "\n");
    }

    next();
});
