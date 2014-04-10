define(
[],
function() {

    return Ember.Route.extend({
        model: function() {
            return this.store.createRecord('Remotesocket');
        },

        setupController: function(controller, model) {
            controller.set("model", model);
            controller.set("title", "Create Socket");
        }
    });
});