
define(
    [
        "./SEConfigController",
        "./SEConfigView"

    ]
    , function(
        SEConfigController,
        SEConfigView
        ) {

        App.Router.map(function() {
            this.route('scriptexecdeviceconfig');
        });

        return {
            ScriptexecdeviceconfigController: SEConfigController,
            ScriptexecdeviceconfigView: SEConfigView
        }
    });