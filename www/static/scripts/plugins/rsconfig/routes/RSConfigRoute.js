define(
    [],
    function() {
        return Ember.Route.extend({

            actions: {
                'submit' : function() {
                    console.log("huhu");
                }
            }
        });
    });