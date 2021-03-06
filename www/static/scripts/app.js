require.config({
    paths: {
        // Libs
        ember: 'libs/emberjs/emberjs-1.5.0',
        'ember.ds': 'libs/emberjs.ds/ember-data',
        'ember.states': 'libs/emberjs.states/ember-states',
        'ember.view': 'libs/emberjs/View',
        'ember.jsonable': 'libs/emberjs/Jsonable',
        handlebars: 'libs/handlebars/handlebars-1.3.0',
        hbs: 'libs/handlebars.hbs/hbs',
        text: 'libs/requirejs.text/requirejs.text-2.0.10',
        jquery: 'libs/jquery/jquery-2.1.0.min',
        'jquery.jquery-ui': 'libs/jquery.jquery-ui/jquery-ui-1.10.3.custom.min',
        'jquery.icheck': './../themes/simplicity/assets/icheck/icheck',
        'jquery.nicescroll': 'libs/jquery.nicescroll/jquery.nicescroll.min',
        underscore: 'libs/underscore/underscore.min',
        socketio: 'libs/socketio/socket.io'
    },

    // Lib Configuration
    shim: {

        ember: {
            deps: ["jquery", "handlebars", "underscore"]
        },

        // Extends default view with some Extramethods-/hooks like 'afterRender'
        "ember.view": {
            deps: ["ember"]
        },

        "ember.ds": {
            deps: ["ember"]
        },

        "ember.states": {
            deps: ["ember"]
        },

        "ember.jsonable": {
            deps: ["ember"]
        },

        // Handlebar Compilation Plugin
        hbs: {
            deps: ["ember", "handlebars", "text"]
        },

        'jquery.icheck' : {
            deps: ["jquery"]
        },

        'jquery.jquery-ui' : {
            deps: ["jquery"]
        },

        'jquery.nicescroll' : {
            deps: ["jquery"]
        }
    }
});


// First: Base with Ember / hbs-Plugin and App instance
define('App', ['ember', 'ember.states', 'ember.ds', 'hbs', 'socketio'],
    function () {
        return window.App = Ember.Application.create({
            LOG_TRANSITIONS: true
        });
});



require(["App"], function(App) {

    App.io = io.connect();
    App.ApplicationAdapter = DS.FixtureAdapter.extend();

    // Release Control to User
    App.deferReadiness();

    // Define Routes
    // TODO: Move Plugin Definition to Module
    App.Router.map(function() {
        this.route("dashboard", { path: '/' }); // Route index to DasboardView -> /
        this.route("dashboard");        // /#/dashboard
        this.route("settings");         // /#/settings
    });

    require([
        // Load default
        "main/views/ApplicationView",
        "main/views/SidebarView",
        "main/views/DashboardView",
        "main/views/SettingsView",

        // Load Plugins
        "plugins/devices/loader",
        "plugins/remotesockets/loader",
        "plugins/gpio/loader",
        "plugins/events/loader",

        "plugins/timeeventconfig/loader",
        "plugins/weathereventconfig/loader",


    ], function(ApplicationView, SidebarView, DashboardView, SettingsView,
        devices, remotesockets, gpio, events, timeeventconfig, weathereventconfig) {

        // Application Base
        App.ApplicationView = ApplicationView;  // Load ApplicationTemplate
        App.SidebarView = SidebarView;          // Load SidebarTemplate into MainTemplate
        App.DashboardView = DashboardView;      // Fill MainTemplate with Content
        App.SettingsView = SettingsView;        // Sample Page which replace Content (Dashboard) in ApplicationTemplate

        // Load Plugin into App
        App.reopen(devices);
        App.reopen(remotesockets);
        App.reopen(gpio);
        App.reopen(events);
        App.reopen(timeeventconfig);
        App.reopen(weathereventconfig);

        // Give Control back to Ember
        App.advanceReadiness();
    });
});




