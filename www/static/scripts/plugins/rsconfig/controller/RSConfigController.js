
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
                            //TODO: Fehler abfangen und anzeigen
                            //TODO: Bei Erfolg alle Eingaben zurücksetzen
                            self.transitionToRoute('devices');
                        });



                        App.io.emit('p/remotesockets/createSocket', { name: defaultConfig.name, code: code });
                    }
                }
            }
        });
    });