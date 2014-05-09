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

                submit: function() {
                    var self = this;

                    var name = this.controller.get('defaultConfig').name;
                    var description = this.controller.get('defaultConfig').description;
                    var repeat_daily = this.controller.get('defaultConfig').repeat_daily;

                    var start = this.controller.get('defaultConfig').start;
                    var end = this.controller.get('defaultConfig').end;
                    var active = this.controller.get('defaultConfig').active;

                    if(name != '') {
                        App.io.emit('events/createEvent', {
                            name: name,
                            description: description,
                            repeat_daily: repeat_daily,
                            start: start,
                            end: end,
                            active: active
                        });
                    }
                }
            }

        });
});