/**
 * Compiling al the handlebars templates into a single template.js, then minifying all the js files into a single js file
 * Not using grunt - think it is overkill for this small project.
 * @type {compiler|exports}
 */

var compiler = require('ember-template-compiler');
var uglifyJS = require("uglify-js");
var fs = require('fs');
var walk = require('walk');

/**
 * The files to be compiled, by adding them individually, I can control dependencies.
 *
 * @type {string[]}
 */
var files = [
    "js/app/injections/notify.js",
    "js/app/injections/utility.js",
    "js/app/translations.js",
    "js/app/app.js",
    "js/app/components/notify.js",
    "js/app/components/graph.js",
    "js/app/views/colorPicker.js",
    "js/app/views/strategyTabAnchorView.js",
    "js/app/views/strategyTabPaneView.js",
    "js/app/views/administrationStrategy.js",
    "js/app/models/administration.js",
    "js/app/models/theme.js",
    "js/app/models/focusarea.js",
    "js/app/models/strategy.js",
    "js/app/routes.js",
    "js/app/routes/graph.js",
    "js/app/routes/administrations.js",
    "js/app/routes/themes.js",
    "js/app/routes/focusareas.js",
    "js/app/routes/strategies.js",
    "js/app/routes/administration.js",
    "js/app/controllers/administrations.js",
    "js/app/controllers/administrationsNew.js",
    "js/app/controllers/administrationsEdit.js",
    "js/app/controllers/themes.js",
    "js/app/controllers/themesNew.js",
    "js/app/controllers/themesEdit.js",
    "js/app/controllers/focusareas.js",
    "js/app/controllers/focusareasNew.js",
    "js/app/controllers/focusareasEdit.js",
    "js/app/controllers/strategies.js",
    "js/app/controllers/administration.js",
    "js/app/controllers/administrationStrategy.js"
];

/**
 * Output files
 */
var templatesJS = "js/app/templates.js";
var compiledAppJS = "js/app/app-compiled.min.js";
var compiledAppMap = "js/app/app-compiled.min.map";
var debugAppJS = "js/app/app-debug.js";

/**
 * The templates directory
 */
var walker  = walk.walk('js/app/templates', { followLinks: false });

/**
 * Normalize the string by replacing the uppercase letter with the equivalent lowercase letter prefixed with '/'.
 * for example focusareasEdit -> focusareas/edit
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

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

/**
 * Purge the file and write the default message
 */
fs.writeFileSync(templatesJS, '//NOTE: This is a generated file. Please do not edit. Your changes will be overridden!\n\n');

/**
 * Walk through the specified directory compiling each file and appending it to the specified template file.
 */
walker.on('file', function(root, stat, next) {
    if(stat.name.endsWith(".hbs")){
        var template = fs.readFileSync(root + '/' + stat.name).toString();
        var input = compiler.precompile(template).toString();
        var templateName = stat.name.replace(".hbs", "");
        var output = "Ember.TEMPLATES['" + normalizeStr(templateName) + "'] = Ember.Handlebars.template(" + input + ");";
        fs.appendFileSync(templatesJS, output + "\n");
    }

    next();
});

/**
 * Create a single javascript file.
 */

/**
 * Minified
 */
var result = uglifyJS.minify(files,{outSourceMap: "app-compiled.min.map"});
fs.writeFile(compiledAppJS, result.code);
fs.writeFile(compiledAppMap, result.map);

/**
 * Beautified - debugging
 */
var toplevel = null;
files.forEach(function(file){
    var code = fs.readFileSync(file, "utf8");
    toplevel = uglifyJS.parse(code, {
        filename: file,
        toplevel: toplevel
    });
});
var code = toplevel.print_to_string({
    beautify: true
});
fs.writeFile(debugAppJS, code);
