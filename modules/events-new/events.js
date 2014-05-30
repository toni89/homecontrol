var assert = require("assert");

var io,
    mgs,
    devices,
    local,
    eventModel,
    events = {

        init: function() {
            var self = this;

            var eventSchema = new mgs.Schema({
                event: 'Mixed'
            });

            eventModel = mgs.model('Event', eventSchema, 'events');
        }

    };



module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");
    assert(imports.db, "Package 'db' is required");
    assert(imports.devices, "Package 'devicesÄ is required");

    io = imports.server.io;
    mgs = imports.db.mongoose;
    devices = imports.devices;

    events.init();

    register(null, {
        "events" : events
    });
};