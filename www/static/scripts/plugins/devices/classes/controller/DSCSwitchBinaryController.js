define(
    [

    ],
    function() {
        return Ember.Controller.extend({
            actions: {
                'switchOn' : function() {
                    var device = this.get('model').get('device'),
                        deviceClass = this.get('model').get('deviceClass');

                    if(device && deviceClass) {
                        App.io.emit(deviceClass.setOn, device);
                    }
                },

                'switchOff' : function() {
                    var device = this.get('model').get('device'),
                        deviceClass = this.get('model').get('deviceClass');

                    if(device && deviceClass) {
                        App.io.emit(deviceClass.setOff, device);
                    }
                }

            }

        });
    });