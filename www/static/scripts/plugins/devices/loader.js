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
        "./views/DSNewView",

        // DeviceItem
        "./controller/DSItemController",
        "./views/DSItemView",

        // DeviceClasses
        "./classes/controller/DSCSwitchBinaryController",
        "./classes/views/DSCSwitchBinaryView",

        "./classes/controller/DSCSwitchMultilevelController",
        "./classes/views/DSCSwitchMultilevelView",

        // Helper
        "./helper/DSDeviceClassHelper"
    ]
    , function(
        DSIndexController, DSIndexRoute, DSIndexView,

        DSNewController, DSNewRoute, DSNewView,

        DSItemController, DSItemView,

        DSCSwitchBinaryController, DSCSwitchBinaryView,
        DSCSwitchMultilevelController, DSCSwitchMultilevelView
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
            DevicesNewView: DSNewView,

            DeviceItemController: DSItemController,
            DeviceItemView: DSItemView,

            // DeviceClasses
            DeviceClassSwitchBinaryController: DSCSwitchBinaryController,
            DeviceClassSwitchBinaryView: DSCSwitchBinaryView,

            DeviceClassSwitchMultilevelController: DSCSwitchMultilevelController,
            DeviceClassSwitchMultilevelView: DSCSwitchMultilevelView

        }
    });