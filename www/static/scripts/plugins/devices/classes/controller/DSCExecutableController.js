define(
    [

    ],
    function() {
        return Ember.Controller.extend({
            device: null,

            init: function() {
                var self = this;

                this.device = this.get('model').get('device');
                this.deviceClass = this.get('model').get('deviceClass');

            },

            actions: {
                'execute' : function() {
                    if(this.device && this.deviceClass) {
                        App.io.emit(this.deviceClass.Start, this.device._id);
                    }
                }
            }


        });
    });