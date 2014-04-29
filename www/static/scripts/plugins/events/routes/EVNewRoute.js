define(
    [],
    function() {
        return Ember.Route.extend({



            actions: {
                submit: function() {
                    var self = this;

                    var name = this.controller.get('defaultConfig').name;
                    var description = this.controller.get('defaultConfig').description;
                    var repeat_daily = this.controller.get('defaultConfig').repeat_daily;

                    var start_mm = this.controller.get('defaultConfig').start_mm;
                    var start_hh = this.controller.get('defaultConfig').start_hh;
                    var end_mm = this.controller.get('defaultConfig').end_mm;
                    var end_hh = this.controller.get('defaultConfig').end_hh;

                    if(name != '') {
                        App.io.on('eventobject saved', function(socket) {
                            console.log('eventobject PING zurück ' + socket);
                            self.transitionToRoute('events.index');
                        });

                        App.io.emit('events/createEvent', {
                            name: name,
                            description: description,
                            repeat_daily: repeat_daily,
                            start_mm: start_mm,
                            start_hh: start_hh,
                            end_mm: end_mm,
                            end_hh: end_hh});
                    }

                }
            }

        });
})