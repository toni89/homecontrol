define(
    [
        "hbs!plugins/events/templates/EVNewTemplate"
    ],
    function(EVNewTemplate) {

        return Ember.View.extend({
            defaultTemplate: EVNewTemplate
        });
    });

