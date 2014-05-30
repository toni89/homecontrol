define(
    [

    ],
    function() {
        return Ember.Controller.extend({


            getDeviceName: function() {
                return this.get('model').device.name || 'Untitled';
            }.property()

        });
    });

