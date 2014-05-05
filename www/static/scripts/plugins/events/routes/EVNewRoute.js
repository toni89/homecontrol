define(
    [],
    function() {
        return Ember.Route.extend({

            model: function() {
                return new Ember.RSVP.Promise(function(resolve) {
                    App.io.on('main/events/info', function(event) {
                        event = JSON.parse(event);
                        resolve({'event': event });
                    });
                    App.io.emit('main/events/info');
                }, 3000);
            },

            setupController: function(controller, model) {
                controller.set('devices', model.devices);
            },

            actions: {
                addDeviceToEvent: function(deviceid) {
                    App.io.emit('events/addDeviceToEvent', {
                        eventid: "5362c30c1f2ee1cc0a0fa8a9",
                        deviceid: deviceid
                    });
                },

                submit: function() {
                    var self = this;

                    var name = this.controller.get('defaultConfig').name;
                    var description = this.controller.get('defaultConfig').description;
                    var repeat_daily = this.controller.get('defaultConfig').repeat_daily;

                    var start = this.controller.get('defaultConfig').start;
                    var end = this.controller.get('defaultConfig').end;

                    if(name != '') {
                        /*App.io.on('eventobject saved', function(socket) {
                            console.log('eventobject PING zurück ' + socket);
                            self.transitionToRoute('events.index');
                        });*/

                        App.io.emit('events/createEvent', {
                            name: name,
                            description: description,
                            repeat_daily: repeat_daily,
                            start: start,
                            end: end});
                    }
                }
            }

        });
});