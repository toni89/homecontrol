define(
    [
        "hbs!plugins/devices/templates/DSActionItemTemplate"
    ],
    function(DSActionItemTemplate) {
        return Ember.View.extend({
            defaultTemplate: DSActionItemTemplate,
            tagName: 'li'
        });
    });