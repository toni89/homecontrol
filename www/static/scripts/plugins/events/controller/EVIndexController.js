define(
    [],
    function() {
        return Ember.Controller.extend({
            events: [],

            actions: {
                'deleteEvent' : function(eventId) {
                    App.io.emit('main/events/delete', eventId);
                }
            }
        });
    });

