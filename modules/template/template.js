var assert = require("assert"),
    fs = require("fs"),
    async = require("async"),
    extend = require("xtend");

var templateDir = "",
    rootTemplate = "",
    defaultProperties = {},
    cache = [],
    parse = [],
    template = {
        "parse" : function(target, filename) {
            if(target && filename && parse.filter(function(el) { return el.target == target; }) == 0)
                parse.push({ target: target, type: "file", template: filename });
        },
        "set" : function(target, value) {
            if(target && parse.filter(function(el) { return el.target == target; }) == 0)
                parse.push({ target: target, type: "text", value: value });
        },
        "template" : function(filename) {
            if(filename && parse.filter(function(el) { return el.type =="file" && el.template == filename; }) == 0) {
                parse.push({ target: "", type: "file", template: filename });
                rootTemplate = filename;
            }
        },
        "render" : function(callback) {
            _cacheFiles(function() {
                if(!rootTemplate || Object.getOwnPropertyNames(cache).indexOf(rootTemplate) < 0) {
                    console.log("ERROR: Can't open root-template '" + rootTemplate + "'");
                    return;
                }

                Object.keys(defaultProperties).forEach(function(target) {
                    var value = defaultProperties[target];
                    if(target)
                        template.set(target, value);
                });

                var page = cache[rootTemplate],
                    reversedParse = parse.reverse();


                reversedParse.forEach(function(item) {
                    if(item.type == "file" && item.target)
                        page = page.replace(new RegExp("{%" + item.target + "%}", 'g'), cache[item.template]);
                });

                reversedParse.forEach(function(item) {
                    if(item.type == "text" && item.target)
                        page = page.replace(new RegExp("{%" + item.target + "%}", 'g'), item.value);
                });

                _clear();
                callback(page);
            });
        },
        "clear" : function() {
            _clear();
        },
        "clearCache" : function() {
            cache = [];
        }
}

module.exports = function(options, imports, register) {
    assert(options.templateDirectory, "Option 'templateDirectory' is required");

    templateDir = options.templateDirectory;

    if(options.default)
        defaultProperties = extend(defaultProperties, options.default);

    register(null, {
        "template" : template
    });
}

function _clear() {
    rootTemplate = "";
    parse = [];
}

function _cacheFiles(onFilesCached) {
    async.each(parse, function (el, callback) {
        if(el.type == "file" && !cache[el.template]) {
            _openFile(el.template, function(err, page) {
                if(err) {
                    console.log("ERROR: Can't open template '" + el.template + "'");
                }else
                    cache[el.template] = page;
                callback()
            });
        } else
            callback();
    }, function (err) {
        if (err) { console.log("Cant't cache templates"); }
        onFilesCached();
    });
}

function _openFile(filename, callback) {
    fs.readFile(templateDir + "/" + filename, 'utf8', callback);
}