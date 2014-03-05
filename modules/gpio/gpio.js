var assert = require("assert");


var gpio = {};
var i = 0;

module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");

    var io = imports.server.io;

    io.sockets.on('connection', function(socket) {

        socket.emit('hello', { hello: 'Hallo GPIOs' });

        var state = new Boolean(false);
        var states = {};

        socket.on('setPin', function(pin) {
            state = !state;

            /*

            Pinswitch hier her

            */

            console.log('change Pin: ' + pin);

            var data = {
                id : pin,
                state : state
            }

            //Emit + Broadcast
            socket.emit('changeState', data);
            socket.broadcast.emit('changeState', data);

        });
    });

    register(null, {
        "gpio" : gpio
    });
}