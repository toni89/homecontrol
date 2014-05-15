var assert = require("assert"),
    process = require('child_process');

var io,
    local,
    deviceType,
    devices,
    client,
    scriptexec = {

        routes : {
            CLASS_EXECUTABLE: {
                Start: 'p/scriptexec/CLASS_EXECUTABLE/Start',
                Stop: 'p/scriptexec/CLASS_EXECUTABLE/Stop',     // TODO: Stoplogik erstellen
                GetState: 'p/scriptexec/CLASS_EXECUTABLE/GetState'
            },
            createScript: 'p/scriptexec/createScript'
        },


        init: function() {
            var self = this;

            deviceType = devices.createDeviceType({
                name: 'scriptexec',
                displayName: 'Script Executer',
                configRoute: 'scriptexecdeviceconfig'
            });

            devices.addDeviceType(deviceType);


            // Public Events
            io.sockets.on('connection', function(socket) {
                    client = socket;

                    socket.on(self.routes.CLASS_EXECUTABLE.Start, function(deviceId) {
                        local.emit(self.routes.CLASS_EXECUTABLE.Start, deviceId);
                    });

                    socket.on(self.routes.CLASS_EXECUTABLE.Stop, function(deviceId) {
                        local.emit(self.routes.CLASS_EXECUTABLE.Stop, deviceId);
                    });

                    socket.on(self.routes.CLASS_EXECUTABLE.GetState, function(deviceId) {
                        local.emit(self.routes.CLASS_EXECUTABLE.GetState, deviceId);
                    });

                    socket.on(self.routes.createScript, function(config) {
                        local.emit(self.routes.createScript, config);
                    });
            });


            // Local Events
            local.on(self.routes.CLASS_EXECUTABLE.Start, function(deviceId) {
                self.startScript(deviceId);
            });

            local.on(self.routes.CLASS_EXECUTABLE.Stop, function(deviceId) {
                self.stopScript(deviceId);
            });

            local.on(self.routes.CLASS_EXECUTABLE.GetState, function(deviceId) {
                self.getState(deviceId);
            });

            local.on(self.routes.createScript, function(config) {
                self.createScript(config, function() {
                    client.emit(self.routes.createScript);
                });
            });

        },

        startScript: function(deviceId) {
            devices.findById(deviceId, function(err, script) {
                if(err)
                    console.log(err);
                else {
                    var worker = process.spawn(script.device.typeData.command);

                    worker.stdout.on('data', function (data) {
                        console.log('stdout: ' + data);
                        // TODO: stdout implementieren
                    });

                    worker.stderr.on('data', function (data) {
                        // TODO: stderr implementieren
                    });

                    worker.on('close', function (code) {
                        // TODO: close implementieren
                    });

                }
            });
        },

        stopScript: function(deviceId) {
            devices.findById(deviceId, function(err, script) {
                if(err)
                    console.log(err);
                else {
                    // TODO: stopScript implementieren
                }
            });
        },

        getState: function(deviceId) {
            devices.findById(deviceId, function(err, script) {
                if(err)
                    console.log(err);
                else {
                    // TODO: getState implementieren
                }
            });
        },

        createScript: function(config, callback) {
            var device = devices.createDevice({
                name: config.name,
                description: 'Script',
                type: deviceType,
                typeData: {
                    command: config.command
                }
            });

            var class_executable = devices.configDeviceClass(
                'CLASS_EXECUTABLE', {
                    Start: this.routes.CLASS_EXECUTABLE.Start,
                    Stop: this.routes.CLASS_EXECUTABLE.Stop,
                    GetState: this.routes.CLASS_EXECUTABLE.GetState
                });

            device.addDeviceClass(class_executable);

            devices.addAndSave(device, function(err) {
                if(callback) callback(err);
            });
        }


    }




module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");
    assert(imports.devices, "Package 'devices' is required");
    assert(imports.db, "Package 'db' is required");

    io = imports.server.io;
    local = imports.server.local;
    devices = imports.devices;


    scriptexec.init();

    /*
    var newScript = {
        name: 'Testscript',
        command: 'ifconfig'
    };

    scriptexec.createScript(newScript);

    scriptexec.startScript('53735443725bc08b03c6bf57');
    */


    register();
}