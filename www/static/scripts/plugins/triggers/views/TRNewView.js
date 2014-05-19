define(
    [
        "hbs!plugins/triggers/templates/TRNewTemplate"
    ],
    function(TRNewTemplate) {

        return Ember.View.extend({
            defaultTemplate: TRNewTemplate,
            classNames: ['row', 'maincontent']
        });
    });

