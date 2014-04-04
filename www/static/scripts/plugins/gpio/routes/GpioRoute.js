define(
    [],
    function() {

        return Ember.Route.extend({
            model: function() {
                return [
                    {name: "GPIO 18", gpio: 12},
                    {name: "GPIO 15", gpio: 10},
                    {name: "GPIO 14", gpio: 8}
                ];
            }/*,

            setupController: function(controller, data) {
            /*
                App.io.on('initPins', function(pins) {
                    console.log(pins);
                });

                App.io.emit('m/gpio/list');

            }*/

        });
    });