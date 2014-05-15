define(
    [
        "hbs!plugins/devices/config/gpio-output/GOConfigTemplate"
    ],
    function(GOConfigTemplate) {
        return Ember.View.extend({
            defaultTemplate: GOConfigTemplate
        });
    });