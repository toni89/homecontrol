define(
    [],
    function() {
        return Ember.Route.extend({

            setupController: function(controller, model) {

                App.io.on('p/gpio/list', function(gpios) {
                    controller.set('model', gpios);
                });

                App.io.emit('p/gpio/list');
            }
        });
    });