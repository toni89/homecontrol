define(
    [],
    function() {

        return Ember.Route.extend({

            model: function(params) {
                return new Ember.RSVP.Promise(function(resolve) {
                    App.io.on('event/info', function(event) {
                        event = JSON.parse(event);
                        resolve({'events': event });
                    });
                    App.io.emit('event/info', params);
                }, 3000);
            },

            setupController: function(controller, model) {
                controller.set('event', model.event);
            }
        });
    });