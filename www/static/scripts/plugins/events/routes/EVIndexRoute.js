define(
    [],
    function() {
        return Ember.Route.extend({

            model: function() {
                return new Ember.RSVP.Promise(function(resolve) {
                    App.io.on('main/events/list', function(event) {
                        var event = JSON.parse(event);
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