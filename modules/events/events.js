var assert = require("assert"),
    Event = require("./libs/Event.js");

var io,
    mgs,
    eventSchema,
    eventModel,
    events = {

        init: function() {
            var self = this;

            // Socket-Events to Frontend
            io.sockets.on('connection', function(socket) {

                // Event Handlers for Frontend
                socket.on('main/events/list', function() {
                    //self._sendEventList();
                });

                socket.on('main/events/delete', function(deviceid) {
                    //self.deleteEventById(deviceid);
                });
            });
        },

        createEvent : function(options) {
            var newEvent = new Event();
            if(options)
                newEvent.extend(options);
            return newEvent;
        },

        addAndSave: function(event, callback) {

            var newEvent = new eventModel({ event: event });
            var error = new Error('Cant save event');

            newEvent.save(function(err, item) {
                if(err){
                    console.log(error);
                    if(callback) callback(error);
                }
                else {
                    if(callback) callback(null, item);
                }
            });
        },
        findAll: function(params, callback) {
            eventModel.find(params, function(err, items) {
                if(err) {
                    console.log(err);
                    if(callback) callback(err);
                } else if(callback)
                    callback(null, items);
            });
        }
    }

module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");
    assert(imports.db, "Package 'db' is required");

    io = imports.server.io;
    mgs = imports.db.mongoose;

    eventSchema = new mgs.Schema({
        event: 'Mixed'
    });

    eventModel = mgs.model('Event', eventSchema, 'events');

    /*
    var testevent = events.createEvent({
       name : 'Testevent'
    });

    events.addAndSave(testevent);
    */

    events.findAll({}, function(err, items){
        console.log(items);
    });

    register(null, {
        "events" : events
    });
}

