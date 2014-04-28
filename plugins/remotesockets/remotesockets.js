var assert = require("assert");

var io,
    devices,
    deviceType,
    remotesockets = {
        init: function() {

            io.sockets.on('connection', function(socket) {

                socket.on('p/remotesockets/createSocket', function(config) {
                    var device = devices.createDevice({
                        name: config.name,
                        description: '433Mhz Socket',
                        type: deviceType,
                        typeData: {
                            code: config.code
                        }
                    });

                    devices.addAndSave(device, function(err) {
                        socket.emit('p/remotesockets/createSocket', err);
                    });
                });

            });
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