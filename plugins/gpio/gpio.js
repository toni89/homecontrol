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

module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");

    db.connect(function (err) {
        db = db.getInstance();

        //Auslesen einer json Datei mit Informationen über die GPIO Pins
        for (pin in RaspberryPinInfo)
        {
            var name = pin
            var nr = RaspberryPinInfo[pin];
            db.add({Name : name, Nr: nr},function(err){});
        }

        //Initialisiert Pins
        function initFresh(socket){
            db.findAll(function(err, pins){

                //Pins einstellen
                var i = 0;
                while(i < pins.length){

                    var nr = pins[i].Nr;
                    var name = pins[i].Name;
                    var state = pins[i].State;

                    changePin(nr, name, state);

                    i += 1;
                }

                //Pins ausgeben
                socket.emit('initPins', pins);
                socket.broadcast.emit('initPins', pins);
            });
        }

        var io = imports.server.io;
        io.sockets.on('connection', function(socket) {

            //Alle Pins aus dem Arbeitsspeicher auslesen
            initFresh(socket);

            socket.on('list', function() {
                initFresh(socket);
            });

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
        });
    });

    register(null, {
        "gpio" : gpio
    });
}