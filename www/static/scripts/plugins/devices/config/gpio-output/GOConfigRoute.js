define(
    [],
    function() {
        return Ember.Route.extend({

            model: function() {
                return new Ember.RSVP.Promise(function(resolve) {
                    App.io.on('p/gpio-output/GetGpioMap', function(gpiomap) {
                        resolve({'gpiomap': gpiomap });
                    });
                    App.io.emit('p/gpio-output/GetGpioMap');
                }, 3000);

            },

            setupController: function(controller, model) {
                console.log(model.gpiomap);
                controller.set('gpiomap', model.gpiomap);
            }
        });
    });