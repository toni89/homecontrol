define("main/views/ApplicationView",
[
    "hbs!main/templates/ApplicationTemplate",
],
function(ApplicationTemplate) {
    return Ember.View.extend({
        defaultTemplate: ApplicationTemplate
    });
});

