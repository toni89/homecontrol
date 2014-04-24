var assert = require("assert"),
    restify = require("restify");

module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");

    var rest = imports.server.rest;

    rest.use(restify.queryParser());
    rest.use(restify.gzipResponse());

    register(null, {
        resthandler : rest
    });
};