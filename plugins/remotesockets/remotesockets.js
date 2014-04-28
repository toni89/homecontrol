var assert = require("assert");

var io,
    devices,
    deviceType,
    remotesockets = {
        init: function() {

            io.sockets.on('connection', function(socket) {

                socket.on('p/remotesockets/CLASS_SWITCH_BINARY/setOn', function(rsocket) {
                    this.setOn();
                });

                socket.on('p/remotesockets/CLASS_SWITCH_BINARY/setOff', function(rsocket) {
                    this.setOff();
                });

                socket.on('p/remotesockets/CLASS_SWITCH_BINARY/getStatus', function(rsocket) {
                    // TODO: vl. internen Status senden
                    socket.emit('p/remotesockets/CLASS_SWITCH_BINARY/getStatus', -1);
                });


                socket.on('p/remotesockets/createSocket', function(config) {
                    var device = devices.createDevice({
                        name: config.name,
                        description: '433Mhz Socket',
                        type: deviceType,
                        typeData: {
                            code: config.code
                        }
                    });

                    var switch_binary = devices.configDeviceClass(
                        'CLASS_SWITCH_BINARY', {
                            setOn: 'p/remotesockets/CLASS_SWITCH_BINARY/setOn',
                            setOff: 'p/remotesockets/CLASS_SWITCH_BINARY/setOff',
                            getStatus: 'p/remotesockets/CLASS_SWITCH_BINARY/getStatus'
                        }
                    );

                    device.addDeviceClass(switch_binary);


                    devices.addAndSave(device, function(err) {
                        socket.emit('p/remotesockets/createSocket', err);
                    });
                });

            });
        },

        setOn: function() {
            console.log("rs: setOn");
        },

        setOff: function() {
            console.log("rs: setOff");
        }
    };



module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");
    assert(imports.devices, "Package 'devices' is required");
    assert(imports.db, "Package 'db' is required");

    io = imports.server.io;
    devices = imports.devices;


    deviceType = devices.createDeviceType({
        name: 'remotesocket',
        displayName: 'Remotesockets',
        configRoute: 'rsconfig'
    });

    devices.addDeviceType(deviceType);






    remotesockets.init();

    register();
}