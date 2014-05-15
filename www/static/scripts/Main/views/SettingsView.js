define("main/views/SettingsView",
    [
        "hbs!main/templates/SettingsTemplate",
    ],
    function(SettingsTemplate) {
        return Ember.View.extend({
            defaultTemplate: SettingsTemplate,
            classNames: ['row', 'maincontent']

        });
    });

