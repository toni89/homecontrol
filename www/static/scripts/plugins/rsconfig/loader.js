// Moduleloader
define(
// Define Routes, Controller, Views, etc.
[
    "./controller/RSConfigController",
    "./views/RSConfigView",
]
, function(
    RSConfigController,
    RSConfigView
    ) {


    App.Router.map(function() {
        this.route('rsconfig');
    });

    return {
        RsconfigController: RSConfigController,
        RsconfigView: RSConfigView
    }
});