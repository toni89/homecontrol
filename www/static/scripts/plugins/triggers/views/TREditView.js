define(
    [
        "hbs!plugins/triggers/templates/TREditTemplate"
    ],
    function(TREditTemplate) {
        return Ember.View.extend({
            defaultTemplate: TREditTemplate,
            classNames: ['row', 'maincontent']
        });
    });
