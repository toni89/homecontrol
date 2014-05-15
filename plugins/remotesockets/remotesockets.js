var assert = require("assert");


var io,
    local,
    devices,
    deviceType,
    remotesockets = {

        routes : {
            createSocket : 'p/remotesockets/createSocket',
            CLASS_SWITCH_BINARY : {
                setOn : 'p/remotesockets/CLASS_SWITCH_BINARY/SetOn',
                setOff : 'p/remotesockets/CLASS_SWITCH_BINARY/SetOff',
                getState : 'p/remotesockets/CLASS_SWITCH_BINARY/GetState'
            }
        },


        init: function() {
            var self = this;



            // #########################################################################################################
            // Public
            // #########################################################################################################


            io.sockets.on('connection', function(socket) {

                socket.on(self.routes.CLASS_SWITCH_BINARY.setOn, function(deviceId) {
                    local.emit(self.routes.CLASS_SWITCH_BINARY.setOn, deviceId);
                });

                socket.on(self.routes.CLASS_SWITCH_BINARY.setOff, function(deviceId) {
                    local.emit(self.routes.CLASS_SWITCH_BINARY.setOff, deviceId);
                });

                socket.on(self.routes.CLASS_SWITCH_BINARY.getState, function(deviceId) {
                    local.emit(self.routes.CLASS_SWITCH_BINARY.getState, deviceId);
                });


                socket.on(self.routes.createSocket, function(config) {
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
                            SetOn: self.routes.CLASS_SWITCH_BINARY.setOn,
                            SetOff: self.routes.CLASS_SWITCH_BINARY.setOff,
                            GetState: self.routes.CLASS_SWITCH_BINARY.getState
                        }
                    );

                    device.addDeviceClass(switch_binary);

                    devices.addAndSave(device, function(err) {
                        socket.emit(self.routes.createSocket, err);
                    });
                });

            });

            // #########################################################################################################
            // Local
            // #########################################################################################################

            local.on(self.routes.CLASS_SWITCH_BINARY.setOn, function(deviceId) {
                self.setOn(deviceId);
            });

            local.on(self.routes.CLASS_SWITCH_BINARY.setOff, function(deviceId) {
                self.setOff(deviceId);
            });

            local.on(self.routes.CLASS_SWITCH_BINARY.getState, function(deviceId) {
                self.getState(deviceId);
            });

        },

        setState: function(deviceId, state, callback) {
            devices.findById(deviceId, function(err, item) {
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

        setOn: function(deviceId) {
            this.setState(deviceId, true, function(err) {
                if(!err) {
                    // TODO: Send Switch Command
                }
            });
        },

        setOff: function(deviceId) {
            this.setState(deviceId, false, function(err) {
                if(!err) {
                    // TODO: Send Switch Command
                }
            });
        },

        getState: function(deviceId) {
            devices.findById(deviceId, function(err, item) {
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
    local = imports.server.local;
    devices = imports.devices;


    deviceType = devices.createDeviceType({
        name: 'remotesocket',
        displayName: 'Remotesockets',
        configRoute: 'remotesocketsdeviceconfig'
    });

    devices.addDeviceType(deviceType);

    remotesockets.init();

    register();
}



