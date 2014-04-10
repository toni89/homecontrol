define([],
function() {
    return Ember.ArrayController.extend({

        actions: {
            'triggerSocket' : function(socketId) {
                App.io.emit('p/remotesockets/socket/trigger', socketId);
            },

            'deleteSocket' : function(socketId) {
                App.io.emit('p/remotesockets/socket/delete', socketId);
            }
        }
    });
});

