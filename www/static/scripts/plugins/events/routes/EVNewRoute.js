define(
    [],
    function() {
        return Ember.Route.extend({

            beforeModel: function() {

            },

            model: function() {
                return new Ember.RSVP.Promise(function(resolve) {
                    App.io.on('main/devices/list', function(devices) {
                        resolve({'devices': JSON.parse(devices) });
                    });
                    App.io.emit('main/devices/list');
                }, 3000);
            },

            setupController: function(controller, model) {
                controller.set('devices', model.devices);
            },

            actions: {

                submit: function() {

                    var self = this;
                }
            }

        });
});