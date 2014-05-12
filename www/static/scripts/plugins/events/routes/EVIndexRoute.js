define(
    [],
    function() {
        return Ember.Route.extend({

            beforeModel: function(){
                var self = this;

                App.io.on('main/events/list', function(events) {
                    events = JSON.parse(events);
                    self.controller.set('events', events);
                });
            },

            model: function() {
                App.io.emit('main/events/list');
            },

            actions: {
                delete: function(id) {
                    App.io.emit('main/events/delete', id);
                },

                toggle: function(id) {
                    App.io.emit('main/event/toggle', id);
                }
            }
        });
})