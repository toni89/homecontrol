
define(
    [

    ],
    function() {
        return Ember.Controller.extend({
            gpiomap: [],


            init: function() {
                var self = this;


                App.io.on('p/gpio-output/GetGpioMap', function(gpiomap) {
                    self.set('gpiomap', gpiomap);
                });
                App.io.emit('p/gpio-output/GetGpioMap');

            },




            actions: {
                'submit' : function() {
                    var self = this,
                        defaultConfig = this.controllerFor('devices.new').get('defaultConfig'),
                        code = this.get('code');

                    if(defaultConfig.name != '' && code != '') {

                    }
                }
            }
        });
    });