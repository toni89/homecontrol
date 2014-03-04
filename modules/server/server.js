var assert = require("assert"),
    http = require("http"),
    express = require("express"),
    _io = require("socket.io");

module.exports = function(options, imports, register) {
    assert(options.port, "Option 'port' is required");

    var app = express(),
        server = http.createServer(app),
        io = _io.listen(server);

    server.listen(options.port);


    register(null, {
        "server" : {
            "express" : app,
            "io" : io
        }
    });
}