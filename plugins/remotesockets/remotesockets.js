var assert = require("assert");


var io,
    devices,
    deviceType,
    remotesockets = {
        init: function() {
            var self = this;


            io.sockets.on('connection', function(socket) {

                socket.on('p/remotesockets/CLASS_SWITCH_BINARY/setOn', function(rsocket) {
                    self.setOn(rsocket);
                });

                socket.on('p/remotesockets/CLASS_SWITCH_BINARY/setOff', function(rsocket) {
                    self.setOff(rsocket);
                });

                socket.on('p/remotesockets/CLASS_SWITCH_BINARY/getState', function(rsocket) {
                    self.getState(rsocket);
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
                            getState: 'p/remotesockets/CLASS_SWITCH_BINARY/getState'
                        }
                    );

                    device.addDeviceClass(switch_binary);

                    devices.addAndSave(device, function(err) {
                        socket.emit('p/remotesockets/createSocket', err);
                    });
                });

            });
        },

        setState: function(rsocket, state, callback) {
            devices.findById(rsocket._id, function(err, item) {
                if(item) {
                    var myDevice = item.device;

                    //item.device.properties.state = true;
                    var binaryClass = item.device.classes.filter(function(el) { return el.id == 'CLASS_SWITCH_BINARY' });

                    if(binaryClass.length > 0) {
                        binaryClass[0].properties.state = state;
                    }

                    item.markModified('device');


                    console.log("remotesockets: set state to " + state);

                    item.save(function(err, item) {
                        if(err)
                            if(callback)
                                callback(err);
                        else {
                            if(callback)
                                callback(null, item);
                        }

                    });
                }
            });

        },

        setOn: function(rsocket) {
            this.setState(rsocket, true, function(err) {
                if(!err) {
                    // TODO: Send Switch Command
                }
            });
        },

        setOff: function(rsocket) {
            this.setState(rsocket, false, function(err) {
                if(!err) {
                    // TODO: Send Switch Command
                }
            });
        },

        getState: function(rsocket) {
            devices.findById(rsocket._id, function(err, item) {
                if(item) {
                    // TODO: send 'item.device.properties.state' to frontend
                }
            })
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



