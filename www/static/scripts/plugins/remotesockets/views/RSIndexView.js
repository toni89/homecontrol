define(
[
    "hbs!plugins/remotesockets/templates/RSIndexTemplate" // TODO: Edit hbs for loading relative Paths
],
function(RSIndexTemplate) {

    return Ember.View.extend({
        defaultTemplate: RSIndexTemplate
    });
});

