define(
    [],
    function() {
        return Ember.Controller.extend({
            events: [],
            devices : [],

            actions: {
                'deleteEvent' : function(eventId) {
                    App.io.emit('main/events/delete', eventId);
                }
            }


        });
    });

