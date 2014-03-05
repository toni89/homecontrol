var assert = require("assert");
var RaspberryPinInfo = require('./RaspberryPinInfo.json');

var gpio = {};
var i = 0;

function PinStore() {
    this.pins = {};
}

PinStore.prototype.add = function (pin, callback) {
    pin._id = i++;
    pin.State = new Boolean(false);

    this.pins[pin._id] = pin;
    setImmediate(callback, null);
};

module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");

    var io = imports.server.io;

    //var gpio = require('rpi-gpio');
    var pin_state = new Boolean(false);

    var PinStore = new PinStore();
    for (pin in RaspberryPinInfo)
    {
        //PinStore.add({pin:pin},function(err){});
    }

    io.sockets.on('connection', function(socket) {

        socket.emit('hello', { hello: 'Hallo GPIOs' });

        socket.on('setPin', function(pin_id) {

            /*
            gpio.setup(pin_id, gpio.DIR_OUT, write);
            pin_state = !pin_state;

            function write() {
                gpio.write(pin_id, pin_state, function(err) {
                    if (err) throw err;
                    console.log('Written to Pin: ' + pin_id + ' State: ' + pin_state);
                });
            }
            */

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