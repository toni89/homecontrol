define("main/views/DashboardView",
[
    "hbs!main/templates/DashboardTemplate",
],
function(DashboardTemplate) {
    return Ember.View.extend({
        defaultTemplate: DashboardTemplate,
        classNames: ['row', 'maincontent']
    });
});

