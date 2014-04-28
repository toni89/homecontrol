
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
            },

            'switchOn' : function(device) {

                App.io.emit('p/zwave/CLASS_SWITCH_BINARY/setOn', device);
            },

            'switchOff' : function(device) {
                App.io.emit('p/zwave/CLASS_SWITCH_BINARY/setOff', device);
            },

            'setLevel0' : function(device) {
                App.io.emit('p/zwave/CLASS_SWITCH_MULTILEVEL/setLevel', device, 0);
            },

            'setLevel99' : function(device) {
                App.io.emit('p/zwave/CLASS_SWITCH_MULTILEVEL/setLevel', device, 99);
            }
        }
    });
});