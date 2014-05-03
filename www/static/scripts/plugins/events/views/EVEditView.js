define(
    [
        "hbs!plugins/events/templates/EVEditTemplate"
    ],
    function(EVEditTemplate) {
        return Ember.View.extend({
            defaultTemplate: EVEditTemplate
        });
    });
