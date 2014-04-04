define([],
function() {
    return Ember.ArrayController.extend({
        actions: {
            'triggerSocket' : function(socketId) {
                App.io.emit('p/remotesockets/trigger', socketId);
            }
        }
    });
});

