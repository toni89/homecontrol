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
        "./classes/controller/DSCExecutableController",
        "./classes/views/DSCExecutableView",

        "./classes/controller/DSCSwitchBinaryController",
        "./classes/views/DSCSwitchBinaryView",

        "./classes/controller/DSCSwitchMultilevelController",
        "./classes/views/DSCSwitchMultilevelView",

        // Config
        "./config/gpio-output/loader",
        "./config/remotesockets/loader",
        "./config/scriptexec/loader",

        // Helper
        "./helper/DSDeviceClassHelper"
    ]
    , function(
        DSIndexController, DSIndexRoute, DSIndexView,

        DSNewController, DSNewRoute, DSNewView,

        DSItemController, DSItemView,

        DSCExecutableController, DSCExecutableView,
        DSCSwitchBinaryController, DSCSwitchBinaryView,
        DSCSwitchMultilevelController, DSCSwitchMultilevelView,

        GpiooutputConfig, RemotesocketsConfig, ScriptexecConfig
        ) {

        // Add Route
        App.Router.map(function() {
            this.resource("devices", function() {                   // /#/devices
                this.route("new");                                  // /#/devices/new
                //this.route("edit", { path: 'edit/:socket_id' });    // /#/devices/edit/123456
            });
        });

        App.reopen(GpiooutputConfig);
        App.reopen(RemotesocketsConfig);
        App.reopen(ScriptexecConfig);


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
            DeviceClassExecutableController: DSCExecutableController,
            DeviceClassExecutableView: DSCExecutableView,

            DeviceClassSwitchBinaryController: DSCSwitchBinaryController,
            DeviceClassSwitchBinaryView: DSCSwitchBinaryView,

            DeviceClassSwitchMultilevelController: DSCSwitchMultilevelController,
            DeviceClassSwitchMultilevelView: DSCSwitchMultilevelView

        };
    });