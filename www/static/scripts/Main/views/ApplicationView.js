define("main/views/ApplicationView",
[
    "hbs!main/templates/ApplicationTemplate",
    "jquery.nicescroll"
],
function(ApplicationTemplate) {
    return Ember.View.extend({
        defaultTemplate: ApplicationTemplate,
        tagName: 'section',
        classNames: ['content'],

        didInsertElement: function() {
            this.setHeaderBarWidth();
            this.addNiceScroll();
        },

        setHeaderBarWidth: function() {
            if ($('body.fixed-headerbar').length) {
                var width = $('.content-liquid-full').outerWidth();

                $('.header-bar', '.fixed-headerbar').width(width);
                $(window).resize(function(){
                    var width = $('.content-liquid-full').outerWidth();
                    $('.header-bar', '.fixed-headerbar').width(width);
                });
            }
        },

        addNiceScroll: function() {
            $("html").niceScroll({
                cursorwidth:'10px',
                cursorborderradius: '2px',
                cursoropacitymin: '0.3'
            });
        }
    });
});

