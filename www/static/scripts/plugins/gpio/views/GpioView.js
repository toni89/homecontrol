define(
    [
        "hbs!plugins/gpio/templates/GpioTemplate" // TODO: Edit hbs for loading relative Paths
    ],
    function(GpioTemplate) {

        return Ember.View.extend({
            defaultTemplate: GpioTemplate
        });
    });

