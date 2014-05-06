define(
    [],
    function() {
        return Ember.Route.extend({

            beforeModel: function() {
                var self = this;

                App.io.on('main/devices/list', function(devices) {
                    var devices = JSON.parse(devices);
                    self.controller.set('devices', devices);
                });

                App.io.on('findDevicesById/currentDevice', function(currentDevices) {
                    var currentDevices = JSON.parse(currentDevices);

                    self.controller.set('currentDevices', currentDevices);
                });

                /*
                App.io.on('event/deviceadded', function(device) {

                    console.log('===');
                    console.log(device);
                    console.log('===');
                });
                */

                /*App.io.on('event/devices/list', function(event_devices) {
                    var event_devices = JSON.parse(event_devices);
                    self.controller.set('event_devices', event_devices);
                });*/
            },

            model: function(params) {
                eventid = params.event_id;
                App.io.emit('main/devices/list');
                App.io.emit('event/devices/list', eventid);

                return new Ember.RSVP.Promise(function(resolve) {
                    App.io.on('main/events/info', function(event) {
                        event = JSON.parse(event);
                        resolve({'event': event});
                    });
                    App.io.emit('main/events/info', params.event_id);
                }, 3000);
            },

            setupController: function(controller, model) {
                id = model.event._id;
                controller.set('event', model.event);
            },

            actions: {
                addDeviceToEvent: function(deviceid, device) {
                    App.io.emit('events/addDeviceToEvent', {
                        eventid: eventid,
                        deviceid: deviceid
                    });

                    console.log(device);
                },

                submit: function() {
                    var self = this;

                    var name = this.controller.get('event').event.name;
                    var description = this.controller.get('event').event.description;
                    var repeat_daily = this.controller.get('event').event.repeat_daily;

                    var start = this.controller.get('event').event.start;
                    var end = this.controller.get('event').event.end;

                    /*App.io.on('eventobject saved', function(socket) {
                     console.log('eventobject PING zurück ' + socket);
                     self.transitionToRoute('events.index');
                     });*/

                    App.io.emit('events/updateEvent', {
                        id: id,
                        name: name,
                        description: description,
                        repeat_daily: repeat_daily,
                        start: start,
                        end: end});
                }
            }
        });
    });