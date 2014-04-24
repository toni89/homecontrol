var assert = require("assert");
    zwave = require("./zwaveapi.js"),
    extend = require("xtend"),
    events = require('events');

var io,
    devices,
    deviceType,
    deviceTypeName = 'zwave device';


module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");
    assert(imports.devices, "Package 'devices' is required");
    assert(options.settings.device, "Option 'settings.device' is required");

    devices = imports.devices,
    io = imports.server.io;

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

                    devices.addAndSave(device);
                }
            });
        }
    });

    zwave.connect();

    register();
}