define(
    [],
    function() {
        return Ember.Route.extend({

            actions: {
                submit: function() {
                    console.log("submit action!!!: " + this.controller.get('defaultConfig').name);
                }
            }

        });
})