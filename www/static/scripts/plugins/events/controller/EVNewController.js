define(
    [],
    function() {
        return Ember.ObjectController.extend({

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

