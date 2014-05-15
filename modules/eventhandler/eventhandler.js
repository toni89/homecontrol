var assert = require("assert"),
    schedule = require("node-schedule"),
    Event = require("./libs/Event.js"),
    EventAction = require("./libs/EventAction.js"),
    EventTerm = require("./libs/EventTerm.js"),
    EventType = require("./libs/EventType.js");


var io,
    local,
    mgs,
    devices,
    eventModel,
    eventhandler = {

        events: [],
        eventTypes: [],

        routes: {
            'raiseTerm': 'main/eventhandler/raiseterm'
        },

        init: function() {
            var self = this;

            local.on(self.routes.raiseTerm, function(eventId, term) {
               self.raiseTerm(eventId, term);
            });


            self.loadEventlist(function(err, events) {
                if(events.length > 0) {
                    self.events = events;

                    self.events.forEach(function(event) {
                        self.initEvent(event);
                    });
                }
            });
        },

        initEvent: function(event) {
            var self = this;

            // Register Event on all EventTermTypes
            event.event.terms.forEach(function(term) {
                var foundTypes = self.eventTypes.filter(function(el) {
                    return el.id == term.targetType;
                });

                if(foundTypes.length > 0) {
                    local.emit(foundTypes[0].registerEvent, event);
                }

            });
        },

        removeEvent: function(event) {

        },

        raiseTerm: function(eventId, term) {
            this.raiseEvent(eventId);
        },

        raiseEvent: function(eventId) {
            var self = this;

            eventModel.findOne({ _id: eventId}, function(err, event) {
                if(err)
                    console.log('eventhandler: Cant raise event');
                else {
                    console.log('eventhandler: Event raised!!');
                    self._execAllEventActions(event.event.actions);
                }
            });
        },

        loadEventlist: function(callback) {
            eventModel.find(function(err, items) {
                if(err){
                    console.log(err);
                    if(callback)
                        return callback(err);
                }else {
                    if(callback)
                        return callback(null, items);
                }
            });
        },

        reloadEventlist: function() {

        },

        flushEventlist: function() {

        },

        saveEvent: function() {

        },

        registerEvent: function() {

        },

        addEventType: function(options) {
            var newType = new EventType();
            if(options)
                newType.extend(options);
            this.eventTypes.push(newType);
        },


        _execAllEventActions: function(actions) {
            console.log(actions);
            var self = this;
            actions.forEach(function(action) {
                self._execEventAction(action);
            });
        },

        _execEventAction: function(action) {
            if(action.targetClass && action.targetAction) {
                devices.getDeviceClass(action.deviceId, action.targetClass, function(deviceClass) {
                    if(deviceClass && deviceClass.hasOwnProperty(action.targetAction)) {
                        local.emit(deviceClass[action.targetAction], action.parameters);
                    }
                });
            }
        }

    };




module.exports = function(options, imports, register) {
    assert(imports.server, "Package 'server' is required");
    assert(imports.db, "Package 'db' is required");
    assert(imports.devices, "Package 'devices' is required");

    io = imports.server.io;
    local = imports.server.local;
    mgs = imports.db.mongoose;
    devices = imports.devices;


    var myEvent = new Event();
    myEvent.name = 'CRONEVENT';

    var a1 = new EventAction();
    var a2 = new EventAction();

    a1.extend({
        targetClass : 'CLASS_SWITCH_BINARY',
        targetAction : 'setOn',
        parameters : ['536a32d209b789ad033f0fe0'],
        deviceId : '536a32d209b789ad033f0fe0'
    });

    a2.extend({
        targetClass : 'CLASS_SWITCH_BINARY',
        targetAction : 'setOn',
        parameters : ['536a3a37479ac5bb032e4184'],
        deviceId : '536a3a37479ac5bb032e4184'
    });

    myEvent.addAction(a1);
    myEvent.addAction(a2);


    var t1 = new EventTerm();

    t1.extend({
        name: 'Schlechtes Wetter',
        targetType: 'weather',
        parameters: {
            temperature: 10
        }
    });

    myEvent.addTerm(t1);

    var eventSchema = new mgs.Schema({
        event: 'Mixed'
    });

    eventModel = mgs.model('Event2', eventSchema, 'events2');


    var newEvent = new eventModel({ event: myEvent });
    //newEvent.save();

    eventhandler.init();


    register(null, {
        "eventhandler" : eventhandler
    });
};