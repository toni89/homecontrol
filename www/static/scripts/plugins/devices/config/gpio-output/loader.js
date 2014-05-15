define(
    [
        "./GOConfigRoute",
        "./GOConfigController",
        "./GOConfigView"
    ]
    , function(
        GOConfigRoute,
        GOConfigController,
        GOConfigView
        ) {

        App.Router.map(function() {
            this.route('gpiooutputdeviceconfig');
        });

        return {
            GpiooutputdeviceconfigRoute: GOConfigRoute,
            GpiooutputdeviceconfigController: GOConfigController,
            GpiooutputdeviceconfigView: GOConfigView
        }
    });