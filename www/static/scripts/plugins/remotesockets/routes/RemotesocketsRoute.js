define(
    [],
    function() {
        return Ember.Route.extend({

            setupController: function(controller, model) {


                App.io.on('p/remotesockets/list', function(data) {
                    controller.set('model', data);
                });

                App.io.emit('p/remotesockets/list');
            }
        });
    });