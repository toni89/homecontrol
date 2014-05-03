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

            push.on('manageDevices', function(eventid, state){
                self.devicesManager(eventid, state);
            });

            push.on('eventlist updated', function(){
                self._sendEventList();
            });

            // Socket-Events to Frontend
            io.sockets.on('connection', function(socket) {

                //????? SOLLTE HIER DRIN NICHT GEHN ?????
                push.on('eventlist updated', function(){
                    self._sendEventList();
                });

                // Event Handlers for creation of new Events
                socket.on('events/createEvent', function(event) {
                    console.log(event);

                    var newevent = events.createEvent({
                        name : event.name,
                        description: event.description,
                        start: event.start_hh + ':' + event.start_mm,
                        end: event.end_hh + ':' + event.end_mm,
                        repeat_daily: event.repeat_daily,
                        devices: []
                    });

                    events.addAndSave(newevent, function(err, item){
                        //console.log('err:=> '+ err + 'item: '+ item);
                        if(err){
                            console.log('Safe Error ' + err);
                        }else{
                            socket.emit('eventobject saved', {});
                        }
                    });
                });

                socket.on('event/info', function(id) {
                    self._eventInfo(id);
                });

                socket.on('events/addDeviceToEvent', function(data) {
                    self._addDeviceToEvent(data);
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

        _eventInfo : function(id){
          this.findById(id, function(err, event){
              io.sockets.emit('event/info', event);
          });
        },

        _addDeviceToEvent : function(data){
            this.findById(data.eventid,function(err, item){
                /*No double entries*/
                var isUnique = true;
                var deviceArray = item.event.devices;

                for(var itemkey in deviceArray){
                    var existingkey = deviceArray[itemkey];

                    if(existingkey === data.deviceid){
                        isUnique = false;
                        //console.log('Device already in Event!');
                        //console.log('=> ' + existingkey, data.deviceid);
                    }
                }

                if(isUnique === true){
                    item.event.devices.push(data.deviceid);
                    item.markModified('event');
                    item.save();
                    //socket.emit('eventobject mo', {});
                }
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

        devicesManager: function(eventid, state){
            this.findById(eventid,function(err, item){
                var deviceArray = item.event.devices;

                for(var itemkey in deviceArray){
                    var deviceid = deviceArray[itemkey];

                    if(state === 'on'){
                        //Machirgendwas AN mit deviceID
                        //push.emit('Device',deviceid,'on');
                    }else if(state === 'off'){
                        //Machirgendwas AUS mit deviceID
                        //push.emit('Device',deviceid,'off');
                    }
                }
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
                        push.emit('manageDevices',item._id,'on');
                    }

                    if(eventdate_end[0] == hour && eventdate_end[1] == minute){
                        console.log('Alle Geräte von ' + item.event.name + ' ausschalten');
                        push.emit('manageDevices',item._id,'off');
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

    events.init();
    events.checkTimeForEvent();

    register(null, {
        "events" : events
    });
}

