
define(
    [

    ],
    function() {
        return Ember.Controller.extend({


            actions: {
                'submit' : function() {
                    var defaultConfig = this.controllerFor('devices.new').get('defaultConfig'),
                        code = this.get('code');

                    console.log(defaultConfig.name, code);
                }
            }
        });
    });