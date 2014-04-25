define(
    [],
    function() {
        return Ember.Route.extend({

            model: function() {
                return new Ember.RSVP.Promise(function(resolve) {
                    App.io.on('main/events/list', function(events) {
                        events = JSON.parse(events);
                        resolve({'events': events });
                    });
                    App.io.emit('main/events/list');
                }, 3000);
            },
            setupController: function(controller, model) {
                controller.set('events', model.events);
            }
        });
    })