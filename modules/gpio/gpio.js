var assert = require("assert");
var RaspberryPinInfo = require('./PinInfo.json');
var db = require("./db.js");
var gpio = {};

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

        //Alles frisch initialisieren
        function initFresh(socket){
            db.findAll(function(err, pins){
                console.log(pins);
                socket.emit('initPins', pins);
                socket.broadcast.emit('initPins', pins);
            });
        }

        var io = imports.server.io;
        io.sockets.on('connection', function(socket) {

            //Alle Pins aus dem Arbeitsspeicher auslesen
            initFresh(socket);

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