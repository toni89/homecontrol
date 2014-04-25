define(
[
    "hbs!plugins/rsconfig/templates/RSConfigTemplate",
],
function(RSConfigTemplate) {
    return Ember.View.extend({
        defaultTemplate: RSConfigTemplate
    });
});