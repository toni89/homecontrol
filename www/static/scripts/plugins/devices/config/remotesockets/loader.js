define(
[
    "./RSConfigController",
    "./RSConfigView"
]
, function(
    RSConfigController,
    RSConfigView
    ) {

    App.Router.map(function() {
        this.route('remotesocketsdeviceconfig');
    });

    return {
        RemotesocketsdeviceconfigController: RSConfigController,
        RemotesocketsdeviceconfigView: RSConfigView
    }
});