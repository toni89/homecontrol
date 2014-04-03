// Moduleloader
define(
    // Define Routes, Controller, Views, etc.
    ["./routes/RemotesocketsRoute",
     "./controller/RemotesocketsController",
     "./views/RemotesocketsView",
     "./views/TriggerSocketView"]
, function(RemotesocketsRoute, RemotesocketsController, RemotesocketsView, TriggerSocketView) {
    // Build Object Package an return it to App
    return {
        RemotesocketsRoute: RemotesocketsRoute,
        RemotesocketsController: RemotesocketsController,
        RemotesocketsView: RemotesocketsView,
        TriggerSocketView: TriggerSocketView
    }
});