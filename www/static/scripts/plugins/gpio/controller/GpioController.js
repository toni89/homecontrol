define([],
    function() {
        return Ember.ArrayController.extend({
            actions: {
                switchGpio: function(gpioId) {
                    App.io.emit('p/gpio/switch', gpioId);
                }
            }
        });
    });