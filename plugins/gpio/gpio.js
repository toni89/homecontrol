var assert = require("assert");
var RaspberryPinInfo = require('./PinInfo.json');
var db = require("./db.js");
    gpio = require('rpi-gpio');

function changePin(nr, name, state){

    gpio.setup(nr, gpio.DIR_OUT, write);

    function write() {
        gpio.write(nr, state, function(err) {
            console.log('Written to Pin: ' + name + ' State: ' + state);
        });
    }
}

/*
function initFresh(mydb){
    mydb.findAll(function(err, pins){

        //Pins einstellen
        var i = 0;
        while(i < pins.length){

            var nr = pins[i].Nr;
            var name = pins[i].Name;
            var state = pins[i].State;

            //changePin(nr, name, state);

            i += 1;
        }
    });
}

function listPins(mydb) {
    mydb.findAll(function(err, pins){
       return pins;
    });
}
*/

function initPins(pins) {
    for(pin in pins) {
        //changePin(pin.pin, pin.name, pin.state);
    }
}

module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");

    db.connect(function (err) {
        db = db.getInstance();

        var pins = RaspberryPinInfo;

        //Auslesen einer json Datei mit Informationen über die GPIO Pins
        for (pin in RaspberryPinInfo)
        {
            db.add({ id: pin.id, name : pin.name, pin: pin.pin, state: pin.state },
                function(err){
                    console.log("Can't write pin to db");
                }
            );
        }

        //Initialisiert Pins
        //initFresh(db);
        initPins(pins)

        var io = imports.server.io;
        io.sockets.on('connection', function(socket) {


            socket.on('p/gpio/list', function() {
                socket.emit('p/gpio/list', pins);
            });

            /*
            socket.on('switchPin', function(pin_id) {
                function onUpdate(err) {
                    if (err) throw err;
                }

                db.findById(pin_id, function(err, pin){
                    pin.State = !pin.State;
                    db.update(pin, onUpdate);
                });
                initFresh(socket);
            });
            */

        });
    });

    register(null, {
        "gpio" : gpio
    });
}