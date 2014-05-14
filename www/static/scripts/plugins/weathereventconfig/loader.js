// Moduleloader
define(
// Define Routes, Controller, Views, etc.
[
    "./views/WEConfigView"
]
, function(
    WEConfigView
    ) {

    App.Router.map(function() {
        this.route('weatherconfig');
    });

    return {
        WeatherconfigView: WEConfigView
    }
});