var assert = require("assert");

var gpio = {};

module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");

    var io = imports.server.io;

    io.sockets.on('connection', function(socket) {

        socket.emit('hello', { hello: 'braa' });

    });

    register(null, {
        "gpio" : gpio
    });
}