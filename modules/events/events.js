var assert = require("assert"),
    Event = require("./libs/Event.js");
    emitter = require("events");
    http = require("http");

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
                self.sendEventList();
            });

            push.on('current event devices updated', function(id){
                self.findDevicesByEventId(id);
            });

            push.on('current event triggers updated', function(id){
                self.findTriggersByEventId(id);
            });

            // Socket-Events to Frontend
            io.sockets.on('connection', function(socket) {

                //????? SOLLTE HIER DRIN NICHT GEHN ?????
                push.on('eventlist updated', function(){
                    self.sendEventList();
                });

                // Event Handlers for creation of new Events
                socket.on('events/createEvent', function(event) {
                    self.newEvent(event);
                });

                socket.on('main/event/info', function(id) {
                    self.eventInfo(id);
                });

                socket.on('event/addDeviceToEvent', function(data) {
                    self.addDeviceToEvent(data);
                });

                socket.on('event/deleteDeviceFromEvent', function(data) {
                    self.deleteDeviceFromEvent(data);
                });

                socket.on('main/events/list', function() {
                    self.sendEventList();
                });

                socket.on('main/events/delete', function(eventid) {
                    self.deleteEventById(eventid);
                });

                socket.on('main/event/toggle', function(eventid) {
                    self.eventToggle(eventid);
                });

                socket.on('event/updateEvent', function(data){
                   self.updateEvent(data);
                });

                socket.on('event/devices/list', function(id){
                    self.findDevicesByEventId(id);
                });

                socket.on('event/device/toggleState', function(data){
                   self.deviceToggleState(data);
                });
            });
        },

        eventInfo : function(id){
          this.findById(id, function(err, event){
              io.sockets.emit('main/event/info', JSON.stringify(event));
          });
        },

        newEvent : function(event){

        /* Standard Datum generieren */
        d = new Date();
        var yyyy = d.getFullYear().toString();
        var mm = (d.getMonth()+1).toString();
        var dd  = d.getDate().toString();
        var erg = (dd[1]?dd:"0"+dd[0]) + '.' + (mm[1]?mm:"0"+mm[0]) + '.' + yyyy ;

        var hour = d.getHours();
        var minute = d.getMinutes();

        var day = d.getDay();
        var month = d.getMonth();
        var year = d.getFullYear();

        hhmm = hour + ':' + minute;

            var newevent = events.createEvent({
                name : event.name,
                devices: []
            });

            events.addAndSave(newevent, function(err, item){
                if(err){
                    console.log('Error addAndSave' + err);
                }else{
                    io.sockets.emit('eventobject saved', item._id);
                }
            });
        },

        eventToggle : function(id){
            this.findById(id, function(err, item){
                item.event.active = !item.event.active;
                item.markModified('event');
                item.save(function(err, item){
                    //if(!err)
                        //push.emit('current event devices updated', item.eventid);
                });
            });
        },

        deleteDeviceFromEvent : function(data){
            this.findById(data.eventid, function(err, item){

                //new array, because delete function produces null objects in array
                var newArray = [];

                for(var i = 0; i < item.event.devices.length; i++){
                    if(item.event.devices[i].id === data.deviceid){
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

        addDeviceToEvent : function(data){
            this.findById(data.eventid, function(err, item){

                /*No double entries*/
                var isUnique = true;
                var deviceArray = item.event.devices;

                for(var itemkey in deviceArray){
                    var object = deviceArray[itemkey];

                    if(object.id === data.deviceid){
                        isUnique = false;
                    }
                }

                if(isUnique === true){
                    item.event.devices.push({id : data.deviceid, state: false});
                    item.markModified('event');
                    item.save(function(err, item){
                        if(!err)
                            push.emit('current event devices updated', data.eventid);
                    });
                }
            });
        },


        findTriggersByEventId : function(eventid){
            this.findById(eventid, function(err, item){
                var deviceArray = item.event.triggers;

                triggers.findAll({'_id': { $in: deviceArray }},function(err, items){
                    io.sockets.emit('event/triggers/list', JSON.stringify(items));
                    io.sockets.emit('event/triggers/list/update', JSON.stringify(items));
                });
            });
        },

        findDevicesByEventId : function(eventid){
            this.findById(eventid, function(err, event){
                var deviceObjects = event.event.devices;
                var idArray = [];

                for(var itemkey in deviceObjects){
                    var object = deviceObjects[itemkey];
                    idArray.push(object.id);
                }

                devices.findAll({'_id': { $in: idArray }},function(err, devices){

                    for(var devicekey in devices){
                        for(var itemkey in deviceObjects){
                            //Falls Sie sich treffen
                            if(devices[devicekey]._id == deviceObjects[itemkey].id){
                                //Übergebe state Information
                                devices[devicekey].device.state = deviceObjects[itemkey].state;
                            }
                        }
                    }

                    io.sockets.emit('event/devices/list', JSON.stringify(devices));
                    io.sockets.emit('event/devices/list/update', JSON.stringify(devices));
                });
            });
        },

        sendEventList : function(){
            this.findAll({}, function(err, items){
                if(!err){
                    io.sockets.emit('main/events/list', JSON.stringify(items));
                }
            })
        },

        updateEvent: function (data) {
            this.findById(data.id, function(err, item){

                console.log(data);

                item.event.name = data.name;

                item.event.trigger = { cat : "time",
                                       start_time : data.start_time,
                                       start_date : data.start_date,
                                       repeat : data.repeat
                                    }

                item.markModified('event');
                item.save(function(err, item){
                    if(!err)
                        io.sockets.emit('current event updated', data.eventid);
                        console.log(item);
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

        deviceToggleState: function(data){
            this.findById(data.eventid, function(err, item){

                for(var i = 0; i < item.event.devices.length; i++){
                    if(item.event.devices[i].id === data.deviceid){
                        item.event.devices[i].state = !item.event.devices[i].state;
                    }
                }

                item.markModified('event');
                item.save(function(err, item){
                    if(!err)
                        //io.sockets.emit('current event updated', data.eventid);
                        push.emit('current event devices updated', data.eventid);
                });
            });
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
        },

        checkWeather: function(callback){

            http.request('http://api.openweathermap.org/data/2.5/weather?lat=48.514978&lon=10.727965', function(response){
                var body = '';
                response.on('data', function (data) {
                    var erg = JSON.parse(data);
                    console.log(erg);
                    //console.log(erg.sys.sunrise);
                });
            }).end();

            setTimeout(this.checkWeather.bind(this), 1000 * 5000);
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
    //events.checkTimeForEvent();
    //events.checkWeather();

    register(null, {
        "events" : events
    });
}

