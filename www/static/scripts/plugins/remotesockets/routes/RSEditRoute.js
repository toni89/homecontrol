define(
[],
function() {

    return Ember.Route.extend({
        model: function(params) {

            App.io.emit('p/remotesockets/socket/info', params.socket_id);
            return this.store.createRecord('Remotesocket');
        },

        setupController: function(controller, model) {
            var self = this;
            // TODO: Model wird nicht übernommen
            App.io.on('p/remotesockets/socket/info', function(socket) {
                socket = JSON.parse(socket);
                controller.set("model", self.store.createRecord('Remotesocket', {
                    name: socket.name,
                    code: socket.code
                }));
            });



            controller.set("title", "Edit Socket");
        }
    });
});