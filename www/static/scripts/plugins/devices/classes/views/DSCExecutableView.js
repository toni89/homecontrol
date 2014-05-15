define(
    [
        "hbs!plugins/devices/classes/templates/DSCExecutableTemplate"
    ],
    function(DSCExecutableTemplate) {
        return Ember.View.extend({
            defaultTemplate: DSCExecutableTemplate
        });
    });

