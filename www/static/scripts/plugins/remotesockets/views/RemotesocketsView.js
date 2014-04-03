define(
[
    "hbs!plugins/remotesockets/templates/RemotesocketsTemplate" // TODO: Edit hbs for loading relative Paths
],
function(RemotesocketsTemplate) {

    return Ember.View.extend({
        defaultTemplate: RemotesocketsTemplate
    });
});

