define(
    [],
    function() {
        return Ember.Route.extend({

            model: function(params) {

                return new Ember.RSVP.Promise(function(resolve) {
                    App.io.on('main/events/info', function(event) {
                        event = JSON.parse(event);
                        resolve({'event': event });
                    });
                    App.io.emit('main/events/info', params.event_id);
                }, 3000);

            },

            setupController: function(controller, model) {
                controller.set('event', model.event);
            }
        });
    });