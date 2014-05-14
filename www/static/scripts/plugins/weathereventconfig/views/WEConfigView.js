define(
[
    "hbs!plugins/weathereventconfig/templates/WEConfigTemplate"
],
function(WEConfigTemplate) {
    return Ember.View.extend({
        defaultTemplate: WEConfigTemplate
    });
});