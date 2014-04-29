define(
    [],
    function() {
        return Ember.Route.extend({

            model: function() {
                /*
                return new Ember.RSVP.Promise(function(resolve) {
                    App.io.on('main/devices/listtypes', function(types) {
                        var types = JSON.parse(types);
                        resolve({'types': types });
                    });
                    App.io.emit('main/devices/listtypes');
                }, 3000);
                */
            },

            setupController: function(controller, model) {
                //controller.set('types', model.types);
            },

            actions: {
                setTypeTemplate: function(selection) {

                    if(selection.configRoute != '') {
                        this.render(selection.configRoute , { into: 'devices.new', outlet: 'typeconfig'});
                    }
                }
            }


        });
    });