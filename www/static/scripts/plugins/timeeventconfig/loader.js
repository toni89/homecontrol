// Moduleloader
define(
// Define Routes, Controller, Views, etc.
[
    "./views/TEConfigView"
]
, function(
    TEConfigView
    ) {

    App.Router.map(function() {
        this.route('timeconfig');
    });

    return {
        TimeconfigView: TEConfigView
    }
});