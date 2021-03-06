define(
    [],
    function() {
        return Ember.Route.extend({

            beforeModel: function(params) {
                var self = this;

                App.io.on('main/devices/list/update', function(devices) {
                    var devices = JSON.parse(devices);
                    self.controller.set('devices', devices);
                });

                App.io.on('event/devices/list/update', function(currentDevices) {
                    var currentDevices = JSON.parse(currentDevices);
                    //??
                    self.controller.set('currentDevices', currentDevices);
                });

                App.io.on('main/triggers/list/update', function(triggers) {
                    var triggers = JSON.parse(triggers);
                    self.controller.set('triggers', triggers);
                });

                App.io.on('event/triggers/list/update', function(currentTriggers) {
                    var currentTriggers = JSON.parse(currentTriggers);
                    self.controller.set('currentTriggers', currentTriggers);
                });
            },

            model: function(params) {
                eventid = params.event_id;

                var r1 = new Ember.RSVP.Promise(function(resolve) {
                    App.io.on('main/event/info', function(event) {
                        event = JSON.parse(event);
                        resolve({'event': event});
                    });
                    App.io.emit('main/event/info', eventid);
                }, 3000);

                var r2 = new Ember.RSVP.Promise(function(resolve) {
                    App.io.on('main/devices/list', function(devices) {
                        devices = JSON.parse(devices);
                        resolve({'devices': devices});
                    });
                    App.io.emit('main/devices/list');
                }, 3000);

                var r3 = new Ember.RSVP.Promise(function(resolve) {
                    App.io.on('event/devices/list', function(currentDevices) {
                        currentDevices = JSON.parse(currentDevices);
                        resolve({'currentDevices': currentDevices});
                    });
                    App.io.emit('event/devices/list', eventid);
                }, 3000);

                var r4 = new Ember.RSVP.Promise(function(resolve) {
                    App.io.on('main/triggers/list', function(triggers) {
                        triggers = JSON.parse(triggers);
                        resolve({'triggers': triggers});
                    });
                    App.io.emit('main/triggers/list');
                }, 3000);

                var r5 = new Ember.RSVP.Promise(function(resolve) {
                    App.io.on('event/triggers/list', function(currentTriggers) {
                        currentTriggers = JSON.parse(currentTriggers);
                        resolve({'currentTriggers': currentTriggers});
                    });
                    App.io.emit('event/triggers/list', eventid);
                }, 3000);

                return new Ember.RSVP.all([r1, r2, r3, r4, r5]).then(function(response){
                    event = response[0].event;
                    devices = response[1].devices;
                    currentDevices = response[2].currentDevices;

                    triggers = response[3].triggers;
                    currentTriggers = response[4].currentTriggers;
                });
            },

            setupController: function(controller, model) {
                id = event._id;
                controller.set('event', event);

                controller.set('devices', devices);
                controller.set('currentDevices', currentDevices);

                controller.set('triggers', triggers);
                controller.set('currentTriggers', currentTriggers);
            },

            actions: {
                setTypeTemplate: function(selection){
                    if(selection.configRoute != ''){
                        this.render(selection.value, {into: 'events.edit', outlet: 'eventconfig'});
                    }
                },

                addDeviceToEvent: function(deviceid, device) {
                    App.io.emit('event/addDeviceToEvent', {
                        eventid: eventid,
                        deviceid: deviceid
                    });

                //this.controller.set('devices').destroyRecord(device);
                //this.controller.set('devices').removeObject(device);

                //this.controller.set('devices').destroy;
                },

                deleteDeviceFromEvent: function(deviceid) {
                    App.io.emit('event/deleteDeviceFromEvent', {
                        eventid: eventid,
                        deviceid: deviceid
                    });
                },

                addTriggerToEvent: function(triggerid) {
                    App.io.emit('event/addTriggerToEvent', {
                        eventid: eventid,
                        triggerid: triggerid
                    });
                },

                deleteTriggerFromEvent: function(triggerid) {
                    App.io.emit('event/deleteTriggerFromEvent', {
                        eventid: eventid,
                        triggerid: triggerid
                    });
                },

                submit: function() {
                    var self = this;

                    var name = this.controller.get('event').event.name;
                    var description = this.controller.get('event').event.description;
                    var repeat_daily = this.controller.get('event').event.repeat_daily;

                    var start_date = this.controller.get('event').event.start_date;
                    var start_time = this.controller.get('event').event.start_time;

                    var end_date = this.controller.get('event').event.end_date;
                    var end_time = this.controller.get('event').event.end_time;

                    var repeat = this.controller.get('event').event.repeat;
                    var active = this.controller.get('event').event.active;

                    /*Funktioniert noch nicht*/
                    console.log(repeat, active);

                    App.io.emit('event/updateEvent', {
                        id: id,
                        name: name,
                        description: description,

                        repeat_daily: repeat_daily,

                        start_date: start_date,
                        start_time: start_time,
                        end_date: end_date,
                        end_time: end_time,

                        repeat: repeat,
                        active: active
                    });
                }
            }
        });
    });