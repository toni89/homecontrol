
define(
[

],
function() {
    return Ember.Controller.extend({
        devices : [],
        types: [],

        actions: {
            'deleteDevice' : function(deviceId) {
                App.io.emit('main/devices/delete', deviceId);
            }
        }
    });
});