define(
    [
        "hbs!plugins/events/templates/EVEventTemplate"
    ],
    function(EVEventTemplate) {
        return Ember.View.extend({
            defaultTemplate: EVEventTemplate
        });
    });
