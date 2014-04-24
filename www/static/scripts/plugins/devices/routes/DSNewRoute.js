define(
    [],
    function() {
        return Ember.Route.extend({

            beforeModel: function() {
                var self = this;

                /*
                App.io.on('main/devices/listtypes', function(types) {
                    var types = JSON.parse(types);
                    //console.log(types);
                    self.controller.set('types', types);
                });
                */
            },

            model: function() {
                //App.io.emit('main/devices/listtypes');

                var self = this;

                return new Ember.RSVP.Promise(function(resolve) {
                        App.io.on('main/devices/listtypes', function(types) {
                            var types = JSON.parse(types);
                            resolve({'types': types });
                        });
                        App.io.emit('main/devices/listtypes');
                }, 3000);
            },

            setupController: function(controller, model) {
                controller.set('types', model.types);
            }



        });
    });