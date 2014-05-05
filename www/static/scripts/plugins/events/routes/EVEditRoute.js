define(
    [],
    function() {
        return Ember.Route.extend({

            beforeModel: function() {
                var self = this;

                App.io.on('main/devices/list', function(devices) {
                    console.log(devices);
                    var devices = JSON.parse(devices);
                    self.controller.set('devices', devices);
                });
            },

            model: function(params) {
                eventid = params.event_id;
                App.io.emit('main/devices/list');

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

                addDeviceToEvent: function(deviceid) {
                    App.io.emit('events/addDeviceToEvent', {
                        eventid: eventid,
                        deviceid: deviceid
                    });
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