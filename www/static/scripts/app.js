require.config({
    paths: {
        // Libs
        ember: 'libs/emberjs/emberjs-1.5.0',
        'ember.view': 'libs/emberjs/View',
        handlebars: 'libs/handlebars/handlebars-1.3.0',
        hbs: 'libs/handlebars.hbs/hbs',
        text: 'libs/requirejs.text/requirejs.text-2.0.10',
        jquery: 'libs/jquery/jquery-2.1.0.min',
        'jquery.sidr': 'libs/jquery.sidr/jquery.sidr.min',
        'jquery.touchwipe': 'libs/jquery.touchwipe/jquery.touchwipe-1.1.1.min',
        enquire: 'libs/enquire/enquire-2.1.0.min',
        socketio: 'libs/socketio/socket.io'
    },

    // Lib Configuration
    shim: {

        ember: {
            deps: ["jquery", "handlebars"]
        },

        // Extends default view with some Extramethods-/hooks like 'afterRender'
        "ember.view": {
            deps: ["ember"]
        },

        // Handlebar Compilation Plugin
        hbs: {
            deps: ["ember", "handlebars", "text"]
        }
    }
});


// First: Base with Ember / hbs-Plugin and App instance
define('App',['ember', 'hbs'],
    function () {
        return window.App = Ember.Application.create({
            LOG_TRANSITIONS: true
        });
});



require(["App"], function(App) {

    // Release Control to User
    App.deferReadiness();

    // Define Routes
    // TODO: Move Plugin Definition to Module
    App.Router.map(function() {
        this.route("dashboard", { path: '/' }); // Route index to DasboardView -> /
        this.route("dashboard");        // /#/dashboard
        this.route("settings");         // /#/settings
        this.route("remotesockets");    // /#/remotesockets
        this.route("gpio");
    });

    require([
        // Load default
        "main/views/ApplicationView",
        "main/views/SidebarView",
        "main/views/DashboardView",
        "main/views/SettingsView",

        // Load Plugins
        "plugins/remotesockets/loader",
        "plugins/gpio/loader"

    ], function(ApplicationView, SidebarView, DashboardView, SettingsView , remotesockets, gpio) {

        // Application Base
        App.ApplicationView = ApplicationView;  // Load ApplicationTemplate
        App.SidebarView = SidebarView;          // Load SidebarTemplate into MainTemplate
        App.DashboardView = DashboardView;      // Fill MainTemplate with Content
        App.SettingsView = SettingsView;        // Sample Page which replace Content (Dashboard) in ApplicationTemplate

        // Load Plugin into App
        App.reopen(remotesockets);
        App.reopen(gpio);

        console.log(App);

        // Give Control back to Ember
        App.advanceReadiness();
    });
});




