define(
    [],
    function() {
        return Ember.Route.extend({

            beforeModel: function(){
                var self = this;

                App.io.on('main/triggers/list', function(triggers) {
                    triggers = JSON.parse(triggers);
                    self.controller.set('triggers', triggers);
                });
            },

            model: function() {
                App.io.emit('main/triggers/list');
            },

            actions: {
                delete: function(id) {
                    App.io.emit('main/triggers/delete', id);
                },

                toggle: function(id) {
                    App.io.emit('main/event/toggle', id);
                }
            }
        });
})