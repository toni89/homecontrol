// Moduleloader
define(
    // Define Routes, Controller, Views, etc.
    [
        "./controller/GpioController",
        "./models/GpioModel",
        "./routes/GpioRoute",
        "./views/GpioView",

    ]
    , function(GpioController, GpioModel, GpioRoute, GpioView) {
        // Build Object Package an return it to App
        return {
            GpioController: GpioController,
            GpioModel: GpioModel,
            GpioRoute: GpioRoute,
            GpioView: GpioView
        }
    });