var assert = require("assert"),
    Event = require("./libs/Event.js");
    emitter = require("events");

var io,
    mgs,
    eventSchema,
    eventModel,
    push = new emitter.EventEmitter(),
    devices,
    events = {
        init: function() {
            var self = this;

            push.on('manageDevices', function(eventid, state){
                self.devicesManager(eventid, state);
            });

            push.on('eventlist updated', function(){
                self._sendEventList();
            });

            push.on('current event devices updated', function(id){
                self._findDevicesByEventId(id);
            });

            // Socket-Events to Frontend
            io.sockets.on('connection', function(socket) {

                //????? SOLLTE HIER DRIN NICHT GEHN ?????
                push.on('eventlist updated', function(){
                    self._sendEventList();
                });

                // Event Handlers for creation of new Events
                socket.on('events/createEvent', function(event) {
                    self._newEvent(event);
                });

                socket.on('main/events/info', function(id) {
                    self._eventInfo(id);
                });

                socket.on('events/addDeviceToEvent', function(data) {
                    self._addDeviceToEvent(data);
                });

                socket.on('events/deleteDeviceFromEvent', function(data) {
                    self._deleteDeviceFromEvent(data);
                });

                // Event Handlers for Frontend
                socket.on('main/events/list', function() {
                    self._sendEventList();
                });

                socket.on('main/events/delete', function(eventid) {
                    self.deleteEventById(eventid);
                });

                socket.on('events/updateEvent', function(data){
                   self.updateEvent(data);
                });

                socket.on('event/devices/list', function(id){
                    self._findDevicesByEventId(id);
                });
            });
        },

        _eventInfo : function(id){
          this.findById(id, function(err, event){
              io.sockets.emit('main/events/info', JSON.stringify(event));
          });
        },

        _newEvent : function(event){
            var newevent = events.createEvent({
                name : event.name,
                description: event.description,
                start: event.start,
                end: event.end,
                repeat_daily: event.repeat_daily,
                devices: []
            });

            events.addAndSave(newevent, function(err, item){
                //console.log('err:=> '+ err + 'item: '+ item);
                if(err){
                    console.log('Safe Error ' + err);
                }else{
                    //io.socket.emit('eventobject saved', {});
                }
            });
        },
        _deleteDeviceFromEvent : function(data){
            this.findById(data.eventid, function(err, item){

                //new array, because delete function produces null objects in array
                var newArray = [];

                for(var i = 0; i < item.event.devices.length; i++){
                    if(item.event.devices[i] === data.deviceid){
                        delete item.event.devices[i];
                    }else{
                        newArray.push(item.event.devices[i]);
                    }
                }

                item.event.devices = newArray;

                item.markModified('event');
                item.save(function(err, item){
                    if(!err)
                    push.emit('current event devices updated', data.eventid);
                });
            });
        },

        _addDeviceToEvent : function(data){
            this.findById(data.eventid, function(err, item){

                console.log(item);

                /*No double entries*/
                var isUnique = true;
                var deviceArray = item.event.devices;

                for(var itemkey in deviceArray){
                    var existingkey = deviceArray[itemkey];

                    if(existingkey === data.deviceid){
                        isUnique = false;
                    }
                }
                if(isUnique === true){
                    item.event.devices.push(data.deviceid);
                    item.markModified('event');
                    item.save(function(err, item){
                        if(!err)
                            push.emit('current event devices updated', data.eventid);
                    });
                }
            });
        },

        _findDevicesByEventId : function(eventid){
            this.findById(eventid, function(err, item){
                var deviceArray = item.event.devices;

                devices.findAll({'_id': { $in: deviceArray }},function(err, items){
                    io.sockets.emit('findDevicesByEventId/currentDevices', JSON.stringify(items));
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

        updateEvent: function (data) {

            /*
            this.findById(data.id, function(err, item){
                item.event.name = data.name;
                item.event.description = data.description;
                item.event.start = data.start;
                item.event.end = data.end;
                item.event.repeat_daily = data.repeat_daily;

                item.markModified('event');
                item.save(function(err, item){
                    if(!err)
                        io.sockets.emit('current event updated', data.eventid);
                });
            });*/

            eventModel.update(
                {_id: data.id},
                { event: {
                    name: data.name,
                    description: data.description,
                    start: data.start,
                    end: data.end,
                    repeat_daily: data.repeat_daily,
                    devices: data.devices
                    }
                }
                , function (err, item) {
                    if (err) {
                        console.log(err);
                    }
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

                    devices.findById(deviceid, function(err, device){
                        device.device.classes.forEach(function(item){
                            if(item.id == 'CLASS_SWITCH_BINARY'){

                                if(state === 'on'){
                                    io.sockets.emit(item.setOn, device);
                                }else if(state === 'off'){
                                    io.sockets.emit(item.setOff, device);
                                }
                            }
                        });
                    });
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

                    if(eventdate_start[0] == hour && eventdate_start[1] == minute){
                        console.log('Alle Geräte von ' + item.event.name + ' anschalten');
                        push.emit('manageDevices', item._id,'on');
                    }

                    if(eventdate_end[0] == hour && eventdate_end[1] == minute){
                        console.log('Alle Geräte von ' + item.event.name + ' ausschalten');
                        push.emit('manageDevices', item._id,'off');
                    }
                }
            });

          if(callback) callback(null);
          setTimeout(this.checkTimeForEvent.bind(this), 1000 * 5);
        }
    }

module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");
    assert(imports.db, "Package 'db' is required");
    assert(imports.devices, "Devices is required");

    io = imports.server.io;
    mgs = imports.db.mongoose;
    devices = imports.devices;

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

