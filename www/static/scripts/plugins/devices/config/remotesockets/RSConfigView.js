define(
[
    "hbs!plugins/devices/config/remotesockets/RSConfigTemplate"
],
function(RSConfigTemplate) {
    return Ember.View.extend({
        defaultTemplate: RSConfigTemplate
    });
});