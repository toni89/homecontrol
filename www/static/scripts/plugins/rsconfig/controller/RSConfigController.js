
define(
    [

    ],
    function() {
        return Ember.Controller.extend({


            actions: {
                'submit' : function() {
                    var self = this,
                        defaultConfig = this.controllerFor('devices.new').get('defaultConfig'),
                        code = this.get('code');

                    if(defaultConfig.name != '' && code != '') {
                        App.io.on('p/remotesockets/createSocket', function(err) {
                            //if(err) TODO: Fehler abfangen und anzeigen
                            self.transitionToRoute('devices');
                        });



                        App.io.emit('p/remotesockets/createSocket', { name: defaultConfig.name, code: code });
                    }
                }
            }
        });
    });