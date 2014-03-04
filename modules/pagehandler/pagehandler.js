var assert = require("assert"),
    express = require("express"),
    pages = require("./pages.js"),
    routes = require("./routes.js");

module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");
    assert(imports.template, "Package 'template' is required");
    assert(imports.meta, "Package 'meta' is required");
    assert(options.staticFiles, "Option 'staticFiles' is required");1

    var app = imports.server.express,
        tpl = imports.template,
        meta = imports.meta;

    //app.use(express.compress());
    //app.use(express.logger());
    app.use(express.static(options.staticFiles));



    Object.keys(routes).forEach(function(method) {
        var mapping = routes[method];

        if(method == "GET") {
            Object.keys(mapping).forEach(function(route) {
                var code = mapping[route];


                if(route && code && typeof(pages[code]) == 'function') {
                    app.get(route, function(req, res, next) {
                        tpl.clear();
                        tpl.clearCache();
                        pages[code](tpl, meta, req, res, next);
                        meta.Apply();
                        tpl.render(function(compiledPage) {
                            res.writeHead(200, "text/html");
                            res.end(compiledPage);
                        });
                    });
                }

            });
        }

        /*
        if(method == "POST") {
            Object.keys(mapping).forEach(function(route) {
                var code = mapping[route];
                app.post(route, function(req, res, next) {
                    pages[code](tpl, req, res, next, function(parsedPage) {
                        res.writeHead(200, "text/html");
                        res.end(parsedPage);
                    });
                });
            });
        }
        */
    });

    register();
}