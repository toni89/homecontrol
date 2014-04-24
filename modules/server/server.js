var assert = require("assert"),
    http = require("http"),
    express = require("express"),
    _io = require("socket.io"),
    restify = require("restify");

module.exports = function(options, imports, register) {
    assert(options.http.server, "Option 'http.server' is required");
    assert(options.http.port, "Option 'http.port' is required");
    assert(options.rest.server, "Option 'rest.server' is required");
    assert(options.rest.port, "Option 'rest.port' is required");


    var app = express(),
        httpServer = http.createServer(app),
        ioServer = _io.listen(httpServer),
        restServer = restify.createServer();


    httpServer.listen(options.http.port, options.http.server, function() {
        console.log('express: Conntected at %s Port %s', options.http.server, options.http.port);
    });

    restServer.listen(options.rest.port, options.rest.server, function() {
        console.log('restify: Conntected at %s Port %s', options.rest.server, options.rest.port);
    });

    register(null, {
        "server" : {
            "express" : app,
            "io" : ioServer,
            "rest" : restServer
        }
    });
}