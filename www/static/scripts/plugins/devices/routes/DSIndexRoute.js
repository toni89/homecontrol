define(
[],
function() {
    return Ember.Route.extend({


        beforeModel: function() {
            var self = this;

            App.io.on('main/devices/list', function(devices) {
                var devices = JSON.parse(devices);
                self.controller.set('devices', devices);
            });

            App.io.on('main/devices/listtypes', function(types) {
                var types = JSON.parse(types);
                self.controller.set('types', types);
            });
        },

        model: function() {
                App.io.emit('main/devices/list');
                App.io.emit('main/devices/listtypes');
        }
    });
});