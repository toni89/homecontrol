define(
    [
        "hbs!plugins/events/templates/EVIndexTemplate"
    ],
    function(EVIndexTemplate) {

        return Ember.View.extend({
            defaultTemplate: EVIndexTemplate,
            classNames: ['row', 'maincontent']
        });
    });

