var assert = require("assert"),
    extend = require("xtend"),
    events = require('events'),
    zwave = require("./zwaveapi.js");


var io,
    push = new events.EventEmitter(),
    local,
    devices,
    deviceType,
    deviceTypeName = 'zwave device',
    routes = {
        CLASS_SWITCH_BINARY : {
            setOn : 'p/zwave/CLASS_SWITCH_BINARY/SetOn',
            setOff : 'p/zwave/CLASS_SWITCH_BINARY/SetOff',
            getState : 'p/zwave/CLASS_SWITCH_BINARY/GetState'
        },
        CLASS_SWITCH_MULTILEVEL : {
            setLevel: 'p/zwave/CLASS_SWITCH_MULTILEVEL/SetLevel'
            // TODO: getLevel implementieren
        }
    },

    getBinaryState = function(nodeid, callback) {
        zwave.getDevice(nodeid, function(mydevice) {
            if(mydevice.classes.hasOwnProperty('37') &&
                mydevice.classes['37'].hasOwnProperty('0')) {
                var state = -1;
                if(mydevice.classes['37']['0'].value)
                    state = 1;
                else
                    state = 0;

                if(callback)
                    callback(state);
            }else if(callback)
                callback(-1);

        })
    },


    registerDeviceEvents = function() {


        io.sockets.on('connection', function(socket) {

            // #########################################################################################################
            // General Class Events
            // #########################################################################################################

            zwave.valueChanged(function(nodeid, node, comclass, value) {

                // CLASS_SWITCH_BINARY
                if(comclass == '37') {
                    // Set all devices to 'inactive'
                    devices.findAll({ 'device.type.name' : 'zwave device', 'device.typeData.nodeid' : nodeid}, function(err, items) {
                        items.forEach(function(item) {
                            var state = (value.value) ? 1 : 0;
                            //push.emit('CLASS_SWITCH_BINARY/state', item._id, state);
                            local.emit(routes.CLASS_SWITCH_BINARY.getState, item._id);
                        });
                    });
                }
            });


            // #########################################################################################################
            // CLASS_SWITCH_BINARY - Public
            // #########################################################################################################

            socket.on(routes.CLASS_SWITCH_BINARY.setOn, function(deviceId) {
                local.emit(routes.CLASS_SWITCH_BINARY.setOn, deviceId);
            });

            socket.on(routes.CLASS_SWITCH_BINARY.setOff, function(deviceId) {
                local.emit(routes.CLASS_SWITCH_BINARY.setOff, deviceId);
            });

            socket.on(routes.CLASS_SWITCH_BINARY.getState, function(deviceId) {
                local.emit(routes.CLASS_SWITCH_BINARY.getState, deviceId);
            });

            // #########################################################################################################
            // CLASS_SWITCH_BINARY - Local
            // #########################################################################################################

            local.on(routes.CLASS_SWITCH_BINARY.setOn, function(deviceId) {
                devices.findById(deviceId, function(err, device) {
                    if(err)
                        console.log("Can't execute '" + routes.CLASS_SWITCH_BINARY.setOn +"'");
                    else {
                        var nodeId = device.device.typeData.nodeid;
                        if(nodeId) {
                            zwave.setOn(nodeId);
                        }
                    }
                });
            });

            local.on(routes.CLASS_SWITCH_BINARY.setOff, function(deviceId) {
                devices.findById(deviceId, function(err, device) {
                    if(err)
                        console.log("Can't execute '" + routes.CLASS_SWITCH_BINARY.setOff +"'");
                    else {
                        var nodeId = device.device.typeData.nodeid;
                        if(nodeId) {
                            zwave.setOff(nodeId);
                        }
                    }
                });

            });

            local.on(routes.CLASS_SWITCH_BINARY.getState, function(deviceId) {
                devices.findById(deviceId, function(err, device) {
                    // TODO: hier springt ein Fehler raus
                    if(err)
                        console.log("Can't execute '" + routes.CLASS_SWITCH_BINARY.getState +"'");
                    else {
                        var nodeId = device.device.typeData.nodeid;
                        if(nodeId) {
                            getBinaryState(nodeId, function(state) {
                                push.emit('CLASS_SWITCH_BINARY/state', device._id, state);
                            });
                        }
                    }
                });
            });


            // CLASS_SWITCH_BINARY - Push events
            push.on('CLASS_SWITCH_BINARY/state', function(deviceId, state) {
                io.sockets.emit('p/zwave/CLASS_SWITCH_BINARY/getState', deviceId, state);
            });

            // #########################################################################################################
            // CLASS_SWITCH_MULTILEVEL - Public
            // #########################################################################################################

            socket.on(routes.CLASS_SWITCH_MULTILEVEL.setLevel, function(deviceId, value) {
                local.emit(routes.CLASS_SWITCH_MULTILEVEL.setLevel, deviceId, value);
            });

            // #########################################################################################################
            // CLASS_SWITCH_MULTILEVEL - Local
            // #########################################################################################################

            local.on(routes.CLASS_SWITCH_MULTILEVEL.setLevel, function(deviceId, value) {
                devices.findById(deviceId, function(err, device) {
                    if(err)
                        console.log("Can't execute '" + routes.CLASS_SWITCH_MULTILEVEL.setLevel +"'");
                    else {
                        var nodeId =  device.device.typeData.nodeid;
                        if(nodeId) {
                            zwave.setLevel(nodeId, value);
                        }
                    }
                });
            });

        });
    };


module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");
    assert(imports.devices, "Package 'devices' is required");
    assert(options.settings.device, "Option 'settings.device' is required");

    devices = imports.devices,
    io = imports.server.io;
    local = imports.server.local;


    zwave.init(options.settings.device, { }, function() {
        deviceType = devices.createDeviceType({
            name: deviceTypeName,
            displayName: 'Z-Wave',
            autoDetect: true
        });

        devices.addDeviceType(deviceType);
    });

    // Set all devices to 'inactive'
    devices.findAll({ 'device.type' : 'zwave device' }, function(err, items) {
        items.forEach(function(item) {
            devices.setInactive(item._id);
        });
    });


    zwave.nodeReady(function(nodeid, node) {

        // Don't add controllers (Z-Stick, ..)
        if(node['producttype'] != '0002') {
            zwave.setLevel(nodeid, 80);

            // Search for zwave device with this nodeid
            devices.findOne({
                'device.type' : deviceType,
                'device.typeData.nodeid' : nodeid
            }, function(err, item) {

                if(item) {
                    // If found, update data
                    item.typeData = node;
                    item.save();
                    devices.setActive(item._id);

                } else {
                    // If not found create new
                    var device = devices.createDevice({
                        name: '',
                        description: node['manufacturer'] + ' ' + node['product'],
                        type: deviceType,
                        status: 'active',
                        statusEnabled: true,
                        typeData: node
                    });


                    // CLASS_SWITCH_BINARY
                    if(node.classes.hasOwnProperty('37')) {
                        var switch_binary = devices.configDeviceClass(
                            'CLASS_SWITCH_BINARY', {
                                SetOn: 'p/zwave/CLASS_SWITCH_BINARY/SetOn',
                                SetOff: 'p/zwave/CLASS_SWITCH_BINARY/SetOff',
                                GetState: 'p/zwave/CLASS_SWITCH_BINARY/GetState'
                            }
                        );

                        device.addDeviceClass(switch_binary);
                    }

                    // CLASS_SWITCH_MULTILEVEL
                    if(node.classes.hasOwnProperty('38')) {
                        var switch_multilevel = devices.configDeviceClass(
                            'CLASS_SWITCH_MULTILEVEL', {
                                SetLevel: 'p/zwave/CLASS_SWITCH_MULTILEVEL/SetLevel',
                                GetLevel: 'p/zwave/CLASS_SWITCH_MULTILEVEL/GetLevel'
                            }
                        );

                        device.addDeviceClass(switch_multilevel);
                    }


                    devices.addAndSave(device);
                }
            });
        }
    });

    zwave.connect();
    registerDeviceEvents();


    register();
}