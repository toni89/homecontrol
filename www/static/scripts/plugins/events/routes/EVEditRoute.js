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
                    self.controller.set('currentDevices', currentDevices);
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

                return new Ember.RSVP.all([r1, r2, r3]).then(function(response){
                    event = response[0].event;
                    devices = response[1].devices;
                    currentDevices = response[2].currentDevices;
                });
            },

            setupController: function(controller, model) {
                id = event._id;
                controller.set('event', event);

                controller.set('devices', devices);
                controller.set('currentDevices', currentDevices);
            },

            actions: {
                setTypeTemplate: function(selection){

                    selectvalue = selection.value;

                    if(selection.configRoute != ''){
                        this.render(selection.value, {into: 'events.edit', outlet: 'eventconfig'});
                    }
                },

                addDeviceToEvent: function(deviceid, device) {
                    App.io.emit('event/addDeviceToEvent', {
                        eventid: eventid,
                        deviceid: deviceid
                    });
                },

                deleteDeviceFromEvent: function(deviceid) {
                    App.io.emit('event/deleteDeviceFromEvent', {
                        eventid: eventid,
                        deviceid: deviceid
                    });
                },

                toggleState: function(deviceid){
                    App.io.emit('event/device/toggleState', {
                        eventid: eventid,
                        deviceid: deviceid
                    });
                },

                submit: function() {
                    var self = this;

                    var array = [];
                    var name = this.controller.get('event').event.name;

                    //Date
                    var repeatDateBool = this.controller.get('event').event.repeatDateBool;
                    var specialDateBool = this.controller.get('event').event.specialDateBool;

                    //Temperature
                    var temperatureBool = this.controller.get('event').event.temperatureBool;
                    var sunBool = this.controller.get('event').event.sunBool;

                    if(specialDateBool == true){
                        var trigger = {};
                        trigger.timeBool = this.controller.get('event').event.timeBool;
                        trigger.start_date = this.controller.get('event').event.start_date;
                        trigger.start_time = this.controller.get('event').event.start_time;
                        trigger.category = 'specialDate';
                        array.push(trigger);
                    }
                    if (repeatDateBool == true){
                        var trigger = {};
                        trigger.repeat_time = this.controller.get('events').event.repeat_time;
                        trigger.selectedTimeRepeat = this.controller.get('selectedTimeRepeat').value;
                        trigger.category = 'repeatDate';
                        array.push(trigger);
                    }

                    if (temperatureBool == true){
                        var trigger = {};
                        trigger.temperatureBool = true;
                        trigger.selectedTemperatureType = this.controller.get('selectedTemperatureType').value;
                        trigger.temperature = this.controller.get('event').event.temperature;
                        trigger.category = 'temperature';
                        array.push(trigger);
                    }
                    if (sunBool == true){
                        var trigger = {};
                        trigger.sunBool = true;
                        trigger.selectedSunType = this.controller.get('selectedSunType').value;
                        trigger.selectedPlusminusType = this.controller.get('selectedPlusminusType').value;
                        trigger.minutes = this.controller.get('event').event.minutes;
                        trigger.category = 'sun';
                        array.push(trigger);
                    }

                    console.log(array);

                    App.io.emit('event/updateEvent', {
                        id: id,
                        name: name,
                        array: array
                    });
                }
            }
        });
    });