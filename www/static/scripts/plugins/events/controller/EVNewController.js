define(
    [],
    function() {
        return Ember.Controller.extend({

            devices: [],

            defaultConfig: {
                name: '',
                description: '',
                repeat_daily: false,
                start_mm: '',
                start_hh: '',
                end_mm: '',
                end_hh: ''
            }

        });
    });

