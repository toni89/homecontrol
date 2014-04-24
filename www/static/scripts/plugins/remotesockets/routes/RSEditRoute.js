define(
[],
function() {

    return Ember.Route.extend({
        model: function(params) {

            App.io.emit('p/remotesockets/socket/info', params.socket_id);       // Fire event with params, only this model hook get the params

            return this.store.createRecord('Remotesocket');                     // create dummy Model, it will be replaced by async socket.io event in beforeModel hook
        },

        // Executes before model function above, we need this to register our socket.io - event
        // More information: http://emberjs.com/guides/routing/asynchronous-routing/
        beforeModel: function() {
            var self = this;    // Very important, inside the App.io.on function we get an context change of this to Socket(.io)Namespace

            App.io.on('p/remotesockets/socket/info', function(socket) {
                socket = JSON.parse(socket);
                self.controller.set("model", self.store.createRecord('Remotesocket', {
                    name: socket.name,
                    code: socket.code
                }));
            });
        }
    });
});
