define(
    [],
    function() {
        return Ember.Route.extend({

            setupController: function(controller, model) {

                App.io.on('p/remotesockets/list', function(rsockets) {
                    controller.set('model', rsockets);
                });

                App.io.emit('p/remotesockets/list');
            }
        });
    });