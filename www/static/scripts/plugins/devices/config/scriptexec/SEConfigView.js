define(
    [
        "hbs!plugins/devices/config/scriptexec/SEConfigTemplate"
    ],
    function(SEConfigTemplate) {
        return Ember.View.extend({
            defaultTemplate: SEConfigTemplate
        });
    });