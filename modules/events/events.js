var assert = require("assert"),
    Event = require("./libs/Event.js");
    emitter = require("events");

var io,
    mgs,
    eventSchema,
    eventModel,
    push = new emitter.EventEmitter(),
    events = {
        init: function() {
            var self = this;

            // Socket-Events to Frontend
            io.sockets.on('connection', function(socket) {

                push.on('eventlist updated', function(){
                    self._sendEventList();
                });



                // Event Handlers for Frontend
                socket.on('main/events/list', function() {
                    self._sendEventList();
                });

                socket.on('main/events/delete', function(eventid) {
                    self.deleteEventById(eventid);
                });
            });
        },

        _sendEventList : function(){
            this.findAll({}, function(err, items){
                if(!err){
                    io.sockets.emit('main/events/list', JSON.stringify(items));
                }
            })
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
        },

        deleteEventById: function(eventid, callback) {
            this.findById(eventid, function(err, item) {
                if(err) {
                    if(callback) callback(err);
                }
                else if(item) {
                    item.remove(function() {
                        push.emit('eventlist updated');
                        if(callback) callback(null);
                    });
                }
            })
        },

        findById: function(eventid, callback) {
            eventModel.findOne({ _id : eventid }, function(err, item) {
                if(err) {
                    console.log(err);
                    if(callback) callback(err);
                } else if(callback)
                    callback(null, item);

            });
        },

        checkTimeForEvent: function(callback){
            eventModel.find(function(err, items){
                for (var itemkey in items) {
                    var item = items[itemkey];

                    /*Date now*/
                    var now = new Date();
                    var hour = now.getHours();
                    var minute = now.getMinutes();

                    var eventdate_start = item.event.start.split(":");
                    var eventdate_end = item.event.end.split(":");

                    //console.log(item._id);
                    //item.update({ _id: item._id }, { $set: { start_triggered: true }}, callback);
                    //eventModel.update({ _id: item._id }, { $set: { "event.start_triggered": true, "event.end_triggered": true }}, callback);

                    if(eventdate_start[0] == hour && eventdate_start[1] == minute){
                        console.log('Alle Geräte von ' + item.event.name + ' anschalten');
                    }

                    if(eventdate_end[0] == hour && eventdate_end[1] == minute){
                        console.log('Alle Geräte von ' + item.event.name + ' ausschalten');
                        //push.emit('p/zwave/CLASS_SWITCH_BINARY/setOn',zwaveObject);
                    }
                }
            });

          if(callback) callback(null);
          setTimeout(this.checkTimeForEvent.bind(this), 1000 * 60);
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

    /**/
    var testevent = events.createEvent({
       name : 'Testevent',
       description: 'testeintrag',
       start: '16:41',
       end: '16:42',
       devices: [1,4,2]
    });

    events.init();

    events.addAndSave(testevent, function(){
        events.checkTimeForEvent();
    });

    /*events.findAll({}, function(err, items){
        console.log(items);
    });
    *
    */

    register(null, {
        "events" : events
    });
}

