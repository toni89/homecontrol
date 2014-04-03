require([
    "hbs!templates/LoginTemplate"
],
function(LoginTemplate) {

    App.LoginView = Ember.View.extend({
        defaultTemplate: LoginTemplate,

        didInsertElement: function() {
            $("body").addClass("login-page");
        },

        willDestroyElement: function() {
            $("body").removeClass("login-page");
        },

        afterRender: function() {
            this.calcPosition();
        },

        calcPosition: function() {
            var min_height = $(window).height(),
                loginbox = $("div.login-page-container");
            $(loginbox).css('min-height', min_height);
            $(loginbox).css('line-height', min_height + 'px');
        }
    });

});

