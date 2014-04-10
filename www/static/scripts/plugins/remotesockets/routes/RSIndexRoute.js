define(
    [],
    function() {
        return Ember.Route.extend({

            setupController: function(controller, model) {

                App.io.on('p/remotesockets/list', function(sockets) {
                    sockets = JSON.parse(sockets);
                    controller.set('sockets', sockets);
                });

                App.io.emit('p/remotesockets/list');
            }
        });
    });