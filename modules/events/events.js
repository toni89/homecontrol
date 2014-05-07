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
                    self._findDevicesById(id);
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
                    socket.emit('eventobject saved', {});
                }
            });
        },

        _addDeviceToEvent : function(data){
            this.findById(data.eventid,function(err, item){

                console.log(item);

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
                }
            });
        },

        _findDevicesById : function(eventid){
            this.findById(eventid, function(err, item){
                var deviceArray = item.event.devices;

                devices.findAll(deviceArray,function(err, items){
                    
                    //io.sockets.emit('findDevicesById/currentDevice', JSON.stringify(items));
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
            eventModel.update(
                {_id: data.id},
                { event: {
                    name: data.name,
                    description: data.description,
                    start: data.start,
                    end: data.end,
                    repeat_daily: data.repeat_daily,
                    devices: []
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
                        push.emit('manageDevices', item._id,'on');
                    }

                    if(eventdate_end[0] == hour && eventdate_end[1] == minute){
                        console.log('Alle Geräte von ' + item.event.name + ' ausschalten');
                        push.emit('manageDevices', item._id,'off');
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

