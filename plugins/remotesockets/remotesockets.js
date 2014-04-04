var assert = require("assert");

module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");

    var rsockets = [
        {id: 1, name: "Kaffeemaschine", group: "generated", code: "001"},
        {id: 2, name: "Waschmaschine", group: "generated", code: "010"},
        {id: 3, name: "Wassersprengler", group: "generated", code: "011"}
    ]


    var io = imports.server.io;
    io.sockets.on('connection', function(socket) {

        socket.on('p/remotesockets/list', function() {
            socket.emit('p/remotesockets/list', rsockets);
        });

        socket.on('p/remotesockets/trigger', function(socketId) {
            console.log('  > Remotesocket mit der ID ' + socketId + ' wurde getriggert');
        });

    });

    register();
}