define(
    [

    ],
    function() {
        return Ember.Controller.extend({
            device: null,
            deviceClass: null,
            state: -1,


            init: function() {
                var self = this;

                this.device = this.get('model').get('device');
                this.deviceClass = this.get('model').get('deviceClass');


                App.io.on(self.deviceClass.getState, function(deviceid, state) {
                    if(self.device._id == deviceid) {
                        self.set('state', state);
                    }
                });


                App.io.emit(self.deviceClass.getState, this.device);
            },


            getBinaryState: function() {
                var state = this.get('state');

                if(state == 1)
                    return 'ON';
                else if(state == 0)
                    return 'OFF';
                else
                    return '-';
            }.property('state'),

            actions: {
                'getState' : function() {

                },

                'switchOn' : function() {
                    if(this.device && this.deviceClass) {
                        App.io.emit(this.deviceClass.SetOn, this.device._id);
                    }
                },

                'switchOff' : function() {
                    if(this.device && this.deviceClass) {
                        App.io.emit(this.deviceClass.SetOff, this.device._id);
                    }
                }

            }

        });
    });