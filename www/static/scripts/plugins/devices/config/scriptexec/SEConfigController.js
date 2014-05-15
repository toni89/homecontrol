
define(
    [

    ],
    function() {
        return Ember.Controller.extend({


            actions: {
                'submit' : function() {
                    var self = this,
                        defaultConfig = this.controllerFor('devices.new').get('defaultConfig'),
                        command = this.get('command');

                    if(defaultConfig.name != '' && command != '') {
                        App.io.on('p/scriptexec/createScript', function(err) {
                            //TODO: Fehler abfangen und anzeigen
                            //TODO: Bei Erfolg alle Eingaben zurücksetzen
                            self.transitionToRoute('devices');
                        });



                        App.io.emit('p/scriptexec/createScript', { name: defaultConfig.name, command: command });
                    }
                }
            }
        });
    });