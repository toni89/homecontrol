var assert = require("assert"),
    extend = require("xtend");

var tpl,
    properties = {
    "title" : "pagetitle",
    "description" : "pagedescription",
    "keywords" : "pagekeywords",
    "robots" : "index, follow"
}

var meta = {
    "title" : function(title) {
        properties.title = title;
    },
    "description" : function(description) {
        properties.description = description;
    },
    "keywords" : function(keywords) {
        properties.keywords = keywords;
    },
    "robots" : function(robots) {
        properties.robots = robots;
    },
    "Apply" : function() {
        tpl.set("METATITLE", properties.title);
        tpl.set("METADESCRIPTION", properties.description);
        tpl.set("METAKEYWORDS", properties.keywords);
        tpl.set("METAROBOTS", properties.robots);
    }
}

module.exports = function(options, imports, register) {
    assert(imports.template, "Package 'template' is required");

    tpl = imports.template;

    if(options.default)
        properties = extend(properties, options.default);

    register(null, {
        "meta" : meta
    });
}