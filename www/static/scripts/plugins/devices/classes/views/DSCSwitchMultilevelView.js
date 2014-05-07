define(
    [
        "hbs!plugins/devices/classes/templates/DSCSwitchMultilevelTemplate",
        "jquery.jquery-ui"
    ],
    function(DSCSwitchMultilevelTemplate) {
        return Ember.View.extend({
            defaultTemplate: DSCSwitchMultilevelTemplate,


            didInsertElement: function() {
                var self = this;

                // Slider
                $("#multilevel_slider").slider({
                    value: 0,
                    min: 0,
                    max: 99,
                    step: 1,
                    slide: function( event, ui ) {
                        self.get('controller').send('setLevel', ui.value);
                    }
                });

            }
        });
    });

