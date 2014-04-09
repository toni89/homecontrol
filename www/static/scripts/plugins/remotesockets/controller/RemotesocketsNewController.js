define([],
function() {
    return Ember.ObjectController.extend({
        actions: {
            submit: function(event) {
                var model = this.get("model");
                //console.log(this.get('name'));
                console.log(model);

                App.io.emit("p/remotesockets/");
            }
        }
    });
});

