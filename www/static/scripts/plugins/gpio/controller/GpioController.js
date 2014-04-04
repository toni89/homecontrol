define([],
    function() {
        return Ember.ArrayController.extend({
            actions: {
                switchValue: function() {
                    alert("Hallo Welt");
                }
            }
        });
    });