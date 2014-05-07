define(
    [

    ],
    function() {
        return Ember.Controller.extend({
            device: null,
            deviceClass: null,


            init: function() {
                this.device = this.get('model').get('device');
                this.deviceClass = this.get('model').get('deviceClass');
            },

            actions: {
                setLevel: function(level) {
                    if(0 <= level && level <= 99) {
                        App.io.emit(this.deviceClass.setLevel, this.device, level);
                    }
                }

            }


        });
    });