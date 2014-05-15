define("main/views/SidebarView",
    [
        "hbs!main/templates/SidebarTemplate",
    ],
    function(SidebarTemplate) {
        return Ember.View.extend({
            defaultTemplate: SidebarTemplate,
            tagName: 'div',
            classNames: ['sidebar', 'fixed-sidebar']

        });
    });

