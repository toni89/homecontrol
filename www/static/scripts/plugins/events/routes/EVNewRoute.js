define(
    [],
    function() {
        return Ember.Route.extend({



            actions: {
                submit: function() {
                    var self = this;

                    var defaultC = this.controller.get('defaultConfig');
                    
                    if(name != '') {
                        App.io.on('eventobject saved', function(socket) {
                            console.log('eventobject PING zurück ' + socket);
                            self.transitionToRoute('events.index');
                        });

                        App.io.emit('events/createEvent', {
                            name: defaultC.name,
                            description: defaultC.description,
                            repeat_daily: defaultC.repeat_daily,
                            start_mm: defaultC.start_mm,
                            start_hh: defaultC.start_hh,
                            end_mm: defaultC.end_mm,
                            end_hh: defaultC.end_hh});
                    }

                }
            }

        });
})