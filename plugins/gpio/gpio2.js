var assert = require("assert"),
    rpigpio = require('rpi-gpio'),
    gpios = require('./PinInfo.json'),
    debug = false,
    rpi_debug = false;

var gpio = {

}

function setGPIO(gpio, state) {
    if(debug)
        console.log("GPIO " + gpio.name + " (Pin " + gpio.pin + ") set to " + state);

    gpio.state = state;

    if(rpi_debug) {
        rpigpio.setup(gpio.pin, rpigpio.DIR_OUT, function() {
            rpigpio.write(gpio.pin, gpio.state, function(err) {
                if(err) console.log(err);
            });
        });
    }


}

function switchGPIO(gpio) {
    var oldState = gpio.state,
        newState = !gpio.state;

    if(debug)
        console.log("Switch GPIO " + gpio.name + " from " + oldState + " to " + newState);

    if(rpi_debug) {
        setGPIO(gpio, newState);
    }
}


function initGPIOS() {
    for(var i in gpios)
        setGPIO(gpios[i], gpios[i].initState);
}



module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");

    initGPIOS();

    var io = imports.server.io;
    io.sockets.on('connection', function(socket) {

        socket.on('p/gpio/list', function() {
            socket.emit('p/gpio/list', gpios);
        });

        socket.on('p/gpio/switch', function(gpioId) {
            gpios.forEach(function(gpio) {

                if(gpio.id == gpioId)
                    switchGPIO(gpio);
            });

            socket.emit('p/gpio/list', gpios);
        });

    });


    register(null, {
        gpio: gpio
    });
};