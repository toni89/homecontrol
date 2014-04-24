define("main/views/SidebarView",
[
    "hbs!main/templates/SidebarTemplate",
    "jquery.sidr",
    "enquire",
    "jquery.touchwipe"
],
function(SidebarTemplate) {
    return Ember.View.extend({
        defaultTemplate: SidebarTemplate,
        tagName: 'div',
        elementId: "sidr-content",

        recalculate: false,

        sidr: {
            instance: 'sidr-sidebar',
            content: '#sidr-content',
            button: '#toggle-sidr-sidebar'
        },

        show: function() {
            $.sidr('open', this.sidr.instance);
        },

        hide: function() {
            $.sidr('close', this.sidr.instance);
        },

        didInsertElement: function() {
            var self = this;

            // Register sidebar + togglebutton
            $(this.sidr.button).sidr({
                name: this.sidr.instance,
                source: this.sidr.content,
                speed: 200,
                onOpen: function() {
                    if(self.recalculate)
                        self.recalculateWidth();
                }
            });

            // Resize automatically content for desktops
            $(window).resize(function() {
                if(self.recalculate)
                    self.recalculateWidth();

            });

            // Handle automatic sidebar behaviour
            enquire.register("screen and (min-width:1024px)", {
                match: function() {
                    self.recalculate = true;
                    self.show();
                },
                unmatch: function() {
                    self.recalculate = false;
                    self.hide();
                }
            });

            // Add Touch Gestures
            $(window).touchwipe({
                wipeLeft: function() {
                    $.sidr('close', self.sidr.instance);
                },
                wipeRight: function() {
                    $.sidr('open', self.sidr.instance);
                },
                preventDefaultEvents: false
            });

            $.sidr('open', this.sidr.instance);
        },

        recalculateWidth: function() {
            $("body").width( $(window).width() - $(this.sidr.content).width() );
        }
    });
});

