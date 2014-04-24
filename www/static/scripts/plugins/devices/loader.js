// Moduleloader
define(
    // Define Routes, Controller, Views, etc.
    [
        // Index
        "./controller/DSIndexController",
        "./routes/DSIndexRoute",
        "./views/DSIndexView",

        // New
        "./controller/DSNewController",
        "./routes/DSNewRoute",
        "./views/DSNewView"
    ]
    , function(
        DSIndexController, DSIndexRoute, DSIndexView,

        DSNewController, DSNewRoute, DSNewView
        ) {

        // Add Route
        App.Router.map(function() {
            this.resource("devices", function() {                   // /#/devices
                this.route("new");                                  // /#/devices/new
                //this.route("edit", { path: 'edit/:socket_id' });    // /#/devices/edit/123456
            });
        });

        // Build Object Package an return it to App
        return {
            // Index
            DevicesIndexRoute: DSIndexRoute,
            DevicesIndexController: DSIndexController,
            DevicesIndexView: DSIndexView,

            DevicesNewRoute: DSNewRoute,
            DevicesNewController: DSNewController,
            DevicesNewView: DSNewView
        }
    });