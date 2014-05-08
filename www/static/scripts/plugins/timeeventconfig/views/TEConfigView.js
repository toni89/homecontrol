define(
[
    "hbs!plugins/rsconfig/templates/RSConfigTemplate"
],
function(TimeConfigTemplate) {
    return Ember.View.extend({
        defaultTemplate: TimeConfigTemplate
    });
});