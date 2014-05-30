define(
    [
        "hbs!plugins/devices/templates/DSClassItemTemplate"
    ],
    function(DSClassItemTemplate) {
        return Ember.View.extend({
            defaultTemplate: DSClassItemTemplate
        });
    });