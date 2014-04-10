define(
[
    "hbs!plugins/remotesockets/templates/RSButtonTemplate" // TODO: Edit hbs for loading relative Paths
],
function(RSButtonTemplate) {

    return Ember.View.extend({
        defaultTemplate: RSButtonTemplate
    });
});

