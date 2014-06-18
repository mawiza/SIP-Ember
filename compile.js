var compiler = require('ember-template-compiler');
var uglifyJS = require("uglify-js");
var fs = require('fs');
var walk = require('walk');
var templatesJS = "js/app/templates.js";
var compiledAppJS = "js/app/app-compiled.min.js";
var compiledAppMap = "js/app/app-compiled.min.map";

var walker  = walk.walk('js/app/templates', { followLinks: false });

/**
 * Normalize the string by replacing the uppercase letter with the equivalent lowercase letter prefixed with '/'.
 * @param str
 * @returns the normalized string
 */
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

/**
 * Purge the file and write the default message
 */
fs.writeFile(templatesJS, '//NOTE: This is a generated file. Please do not edit. Your changes will be overridden!\n\n');

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

/**
 * Walk through the specified directory compiling each file and appending it to the specified template file.
 */
walker.on('file', function(root, stat, next) {
    if(stat.name.endsWith(".hbs")){
        var template = fs.readFileSync(root + '/' + stat.name).toString();
        var input = compiler.precompile(template).toString();
        var templateName = stat.name.replace(".hbs", "")
        var output = "Ember.TEMPLATES['" + normalizeStr(templateName) + "'] = Ember.Handlebars.template(" + input + ");";
        fs.appendFile(templatesJS, output + "\n");
    }

    next();
});

/**
 * Compile the application javascript files into a minified version.
 */
var result = uglifyJS.minify([
    "js/app/app.js",
    "js/app/models/administration.js",
    "js/app/routes.js",
    "js/app/controllers/administrations.js",
    "js/app/controllers/administrationsNew.js",
    "js/app/controllers/administrationsEdit.js"

],
    {
        outSourceMap: "app-compiled.min.map"
    }
);
fs.writeFile(compiledAppJS, result.code);
fs.writeFile(compiledAppMap, result.map);
