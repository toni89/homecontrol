var assert = require("assert"),
    gpiomap = require("./libs/gpiomap.js");


var io,
    local,
    devices,
    deviceType,
    client,
    gpio = {

        routes: {
            CLASS_SWITCH_BINARY: {
                SetOn: 'p/gpio-output/SetOn',
                SetOff: 'p/gpio-output/SetOff',
                GetState: 'p/gpio-output/GetState'
            },
            CreateDevice: 'p/gpio-output/CreateDevice',
            GetGpioMap: 'p/gpio-output/GetGpioMap'
        },

        init: function() {
            var self = this;

            // Config
            deviceType = devices.createDeviceType({
                name: 'gpio-output',
                displayName: 'GPIO Output',
                configRoute: 'gpiooutputdeviceconfig'
            });

            devices.addDeviceType(deviceType);

            // #########################################################################################################
            // Public
            // #########################################################################################################

            io.sockets.on('connection', function(socket) {

                client = socket;

                socket.on(self.routes.CLASS_SWITCH_BINARY.SetOn, function(deviceId) {
                    local.emit(self.routes.CLASS_SWITCH_BINARY.SetOn, deviceId);
                });

                socket.on(self.routes.CLASS_SWITCH_BINARY.SetOff, function(deviceId) {
                    local.emit(self.routes.CLASS_SWITCH_BINARY.SetOff, deviceId);
                });

                socket.on(self.routes.CLASS_SWITCH_BINARY.GetState, function(deviceId) {
                    local.emit(self.routes.CLASS_SWITCH_BINARY.GetState, deviceId);
                });

                socket.on(self.routes.CreateDevice, function(config) {
                    local.emit(self.routes.CreateDevice, config);
                });

                socket.on(self.routes.GetGpioMap, function() {
                    local.emit(self.routes.GetGpioMap);
                });

            });


            // #########################################################################################################
            // Local
            // #########################################################################################################

            local.on(self.routes.CLASS_SWITCH_BINARY.SetOn, function(deviceId) {
                self.setOn(deviceId);
            });

            local.on(self.routes.CLASS_SWITCH_BINARY.SetOff, function(deviceId) {
                self.setOff(deviceId);
            });

            local.on(self.routes.CLASS_SWITCH_BINARY.GetState, function(deviceId) {
                self.getState(deviceId);
            });

            local.on(self.routes.CreateDevice, function(config) {
                self.createDevice(config, function(err) {
                    if(!err && client)
                        client.emit(self.routes.CreateDevice);
                });
            });

            local.on(self.routes.GetGpioMap, function() {
                client.emit(self.routes.GetGpioMap, gpiomap);
            });
        },

        setOn: function(deviceId) {

        },

        setOff: function(deviceId) {

        },

        getState: function(deviceId) {

        },

        createDevice: function(config, callback) {

            var device = devices.createDevice({
                name: config.name,
                description: 'GPIO Output',
                type: deviceType,
                typeData: {

                }
            });

            var switch_binary = devices.configDeviceClass(
                'CLASS_SWITCH_BINARY', {
                    SetOn: self.routes.CLASS_SWITCH_BINARY.SetOn,
                    SetOff: self.routes.CLASS_SWITCH_BINARY.SetOff,
                    GetState: self.routes.CLASS_SWITCH_BINARY.GetState
                }
            );

            device.addDeviceClass(switch_binary);

            devices.addAndSave(device, function(err) {
                if(callback)
                    callback(err);
            });
        },


    };





module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");
    assert(imports.devices, "Package 'devices' is required");

    io = imports.server.io;
    local = imports.server.local;
    devices = imports.devices;

    gpio.init();

    register();
}
