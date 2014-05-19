define(
    [
        "hbs!plugins/triggers/templates/TRIndexTemplate"
    ],
    function(TRIndexTemplate) {

        return Ember.View.extend({
            defaultTemplate: TRIndexTemplate,
            classNames: ['row', 'maincontent']
        });
    });

