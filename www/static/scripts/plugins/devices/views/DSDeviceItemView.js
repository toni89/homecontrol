define(
    [
        "hbs!plugins/devices/templates/DSDeviceItemTemplate"
    ],
    function(DSItemTemplate) {
        return Ember.View.extend({
            defaultTemplate: DSItemTemplate
        });
    });

