// Moduleloader
define(
    // Define Routes, Controller, Views, etc.
    [
        "./controller/GpioController",
        "./routes/GpioRoute",
        "./views/GpioView",
        "./views/GpioClickedView"
    ]
    , function(GpioController, GpioRoute, GpioView, GpioClickedView) {
        // Build Object Package an return it to App
        return {
            GpioController: GpioController,
            GpioRoute: GpioRoute,
            GpioView: GpioView,
            GpioClickedView: GpioClickedView
        }
    });